import {describe, test} from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import fs from 'fs'
import jscodeshift from 'jscodeshift'
import transform, {parser} from '#transforms/revert-ember-error/index.js'

describe('revert-ember-error', () => {
  const fixtureDir = path.join(__dirname, 'fixtures')
  const testCases = [
    {
      name: 'should handle revert-ember-error import and usage in javascript',
      input: 'transform.input.js',
      output: 'transform.output.js'
    },
    {
      name: 'should handle revert-ember-error import and usage in typescript',
      input: 'transform.input.ts',
      output: 'transform.output.ts'
    }
  ]

  testCases.forEach((testCase) => {
    test(testCase.name, () => {
      const inputPath = path.join(fixtureDir, testCase.input)
      const outputPath = path.join(fixtureDir, testCase.output)
      const source = fs.readFileSync(inputPath, 'utf8')
      const expectedOutput = fs.readFileSync(outputPath, 'utf-8')

      const j = jscodeshift.withParser(parser)

      const actualOutput = transform({path: inputPath, source}, {j, jscodeshift: j, stats: () => {}, report: () => {}})

      assert.equal(actualOutput.trim(), expectedOutput.trim())
    })
  })
})
