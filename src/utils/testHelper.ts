import {describe, test} from 'node:test'
import assert from 'node:assert'
import path from 'node:path'
import fs from 'fs'
import jscodeshift from 'jscodeshift'

function runTestCases(name, dir, testCases, transform, parser) {
    describe(name, () => {
        const fixtureDir = path.join(dir, 'fixtures')

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

}

export default runTestCases;
