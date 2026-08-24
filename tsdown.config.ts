import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.app.json',
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'node',
  deps: {
    neverBundle: ['prettier'],
  },
})
