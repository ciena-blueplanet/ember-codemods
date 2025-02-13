import {htmlSafe} from '@ember/template';
import _ from 'lodash'
import {capitalize, classify, camelize} from '@ember/string';

const str = 'str'

export default Component.extend({

    test () {
        // This should be modified
        capitalize('str')
        // This should be modified
        camelize(str)
        // This should not be modified
        _.capitalize('abc')
        // This should be modified
        classify('')
        // This should be modified
        capitalize('random')
        // This should be modified
        htmlSafe('')
    }
})
