// @ts-nocheck
import {A} from '@ember/array'
import {camelize} from '@ember/string';

export function computedOverrides (mapType: string, networkMapStorage: object, configOverrides: object) {

    // This should be modified
    'str'.capitalize()
    // This should be modified
    str.camelize()
    // This should not be modified
    _.capitalize('abc')
    // This should be modified
    String.classify('')
    // This should be modified
    Ember.String.capitalize('random')
}
