import {htmlSafe} from '@ember/template';
import _ from 'lodash'
import {capitalize, decamelize, camelize, classify} from '@ember/string';

const str = 'str'

const {
    something
} = Ember

export default Component.extend({

    test () {
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
        // This should be modified
        htmlSafe('')
        // This should be modified
        decamelize('random')
    }
})
