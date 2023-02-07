module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  ignoreFiles: ['**/node_modules/**'],
  customSyntax: 'postcss-scss',
  files: ['**/*.scss'],
  rules: {
    'property-no-vendor-prefix': null,
    'function-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['use', 'include', 'mixin', 'function', 'return', 'extend'] }],
  },
};
