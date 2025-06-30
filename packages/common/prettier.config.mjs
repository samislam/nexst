import prettierConfig from '@samislam/prettier-config'

export default {
  ...prettierConfig,
  overrides: [
    {
      files: ['./src/misc/conditionalize-validator.ts'],
      options: {
        plugins: [],
      },
    },
  ],
}
