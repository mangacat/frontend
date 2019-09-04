module.exports = {
    'root': true,
    'rules': {
        'indent': [ 2, 'tab', { 'SwitchCase': 1 } ],
        'semi': [ 2, 'never' ],
        'keyword-spacing': [ 2, { 'before': true, 'after': true } ],
        'space-before-blocks': [ 2, 'always' ],
        'no-mixed-spaces-and-tabs': [ 2, 'smart-tabs' ],
        'no-cond-assign': 0,
        'no-unused-vars': 2,
        'object-shorthand':  [ 2, 'always' ],
        'no-const-assign': 2,
        'no-class-assign': 2,
        'no-this-before-super': 2,
        'no-var': 2,
        'no-unreachable': 2,
        'valid-typeof': 2,
        'quote-props': [ 2, 'as-needed' ],
        'one-var': [ 2, 'never' ],
        'prefer-arrow-callback': 2,
        'prefer-const': [ 2, { 'destructuring': 'all' } ],
        'arrow-spacing': 2,
        'no-inner-declarations': 0,
        'require-atomic-updates': 0,
        'unicorn/filename-case': 0,
        'unicorn/prevent-abbreviations': 1
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
    },
    'plugins': [
        'svelte3'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:unicorn/recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 2020,
        'sourceType': 'module'
    },
    'overrides': [
        {
            'files': '*.svelte',
            'processor': 'svelte3/svelte3'
        }
    ],
    'settings': {
        'svelte3/ignore-styles': ({ lang }) => { return lang === 'postcss' }
    }
}