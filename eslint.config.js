import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    typescript: true,
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: {
        it: true,
      },
    },
  }
)
