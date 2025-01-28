import type {API, Collection, FileInfo, FunctionDeclaration, ImportSpecifier, JSCodeshift, Options} from 'jscodeshift'
import type {PatternKind} from 'ast-types/gen/kinds'
import {
  createNewGetter,
  flattenDependencies,
  getArgumentRawValue
} from '#transforms/revert-computed-macro/utils.js'

export const parser = 'ts'

/**
 * TODO:
 * Determine if want to use get instead of getProperties
 * Handle class based decorators version(? do we have any usages like this?). Think it's mainly classic
 */

export default function transformer (file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift

  const root = j(file.source, options)

  _replaceEmberComputedImport(root, j)

  return root.toSource({quote: 'single', objectCurlySpacing: false})
}

function _replaceEmberComputedImport (root: Collection, j: JSCodeshift) {
  // Find the import declaration for 'ember-macro-helpers/computed'
  const computedImport = root.find(j.ImportDeclaration, {
    source: {value: 'ember-macro-helpers/computed'}
  })

  if (computedImport.size() > 0) {
    const computedVariableName = computedImport.find(j.Identifier).get().value.name // This is most likely 'computed'
    // Remove the old import
    computedImport.remove()

    _updateComputedUsage(root, j, computedVariableName)
    _addComputedImport(root, j)
    _updateEmberObjectImport(root, j)
  }
}

function _updateComputedUsage (root: Collection, j: JSCodeshift, computedVariableName: string) {
  root
    .find(j.CallExpression, {
      callee: {name: computedVariableName}
    })
    .forEach((path) => {
      const callExpression = path.value
      const callbackFunc = callExpression.arguments[path.value.arguments.length - 1] as unknown as FunctionDeclaration

      if (['FunctionExpression', 'ArrowFunctionExpression'].includes(callbackFunc.type)) {
        const otherArguments = path.value.arguments.slice(0, -1)
        const existingParams = callbackFunc.params
        // Remove the existing parameters
        callbackFunc.params = []

        const argumentsToMoveAndGet = flattenDependencies(
          otherArguments.map((arg) => getArgumentRawValue(arg) ?? arg)
        )

        const newGetters = existingParams.map((parameter: PatternKind, index) => {

          if (index >= argumentsToMoveAndGet.length) {
            return j.variableDeclaration('const', [j.variableDeclarator(parameter)])
          }

          if (parameter.type === 'AssignmentPattern') {
            const left = parameter.left
            const right = parameter.right
            return createNewGetter(j, left, argumentsToMoveAndGet[index], right)
          }

          return createNewGetter(j, parameter, argumentsToMoveAndGet[index])
        })

        if (callbackFunc.body.body) {
          callbackFunc.body.body.unshift(...newGetters)
        }
      }
    })
}

function _addComputedImport (root: Collection, j: JSCodeshift) {
  // Find the import declaration for '@ember/object'
  const emberObjectImport = root.find(j.ImportDeclaration, {
    source: {value: '@ember/object'}
  })

  if (emberObjectImport.size() > 0) {
    // If '@ember/object' is already being imported, add 'computed' to the import specifiers
    const currentSpecifierImports = emberObjectImport
      .get('specifiers')
      .value.map((importSpecfier: ImportSpecifier) => importSpecfier.imported?.name)
      .filter((e?: string) => e !== undefined)

    const emberObjectImportSpecifiers = emberObjectImport.get('specifiers')

    if (!currentSpecifierImports.includes('computed')) {
      emberObjectImportSpecifiers.push(j.importSpecifier(j.identifier('computed')))
    }
  } else {
    // If '@ember/object' is not already being imported, add a new import declaration
    j(root.find(j.ImportDeclaration).at(0).get()).insertAfter(
      j.importDeclaration([j.importSpecifier(j.identifier('computed'))], j.literal('@ember/object'))
    )
  }
}

function _updateEmberObjectImport (root: Collection, j: JSCodeshift) {
  const emberObjectImport = root.find(j.ImportDeclaration, {
    source: {value: '@ember/object'}
  })

  const currentSpecifierImports = emberObjectImport
    .get('specifiers')
    .value.map((importSpecfier: ImportSpecifier) => importSpecfier.imported?.name)
    .filter((e?: string) => e !== undefined)

  const emberObjectImportSpecifiers = emberObjectImport.get('specifiers')

  const importsToAdd = [
    'get',
    'getWithDefault'
  ].filter(name => root.find(j.CallExpression, {callee: {name}}).length > 0)

  importsToAdd.forEach((importToAdd) => {
    if (!currentSpecifierImports.includes(importToAdd)) {
      emberObjectImportSpecifiers.push(j.importSpecifier(j.identifier(importToAdd)))
    }
  })
}



