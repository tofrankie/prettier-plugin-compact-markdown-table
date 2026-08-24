import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    typescript: false,
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        it: true,
      },
    },
  }
)
