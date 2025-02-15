import _ from 'lodash'
import { capitalize } from '@ember/string';

const str = 'str'

const {String} = Ember

export default Component.extend({

    test () {
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
        // This should be modified
        Ember.String.htmlSafe('')
    }
})
