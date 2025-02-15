// @ts-nocheck
import {A} from '@ember/array'
import {camelize, capitalize, classify} from '@ember/string';

export function computedOverrides (mapType: string, networkMapStorage: object, configOverrides: object) {

    // This should be modified
    capitalize('str')
    // This should be modified
    camelize(str)
    // This should not be modified
    _.capitalize('abc')
    // This should be modified
    classify(String)
    // This should be modified
    capitalize('random')
}
