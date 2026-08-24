import plugin, * as pluginModule from '@tofrankie/prettier-plugin-compact-markdown-table'
import * as prettier from 'prettier'
import { expect, it } from 'vitest'
import { TABLE_LAYOUT } from '../src/constants'

type PluginReference = prettier.Plugin | string

async function format(
  input: string,
  options: Record<string, unknown> = {},
  plugins: PluginReference[] = [plugin]
) {
  return prettier.format(input, {
    parser: 'markdown',
    plugins,
    ...options,
  })
}

it('supports a default plugin export', async () => {
  expect(plugin).toEqual({
    options: pluginModule.options,
    parsers: pluginModule.parsers,
    printers: pluginModule.printers,
  })
})

it('supports a namespace plugin import', async () => {
  const result = await format(
    `| A | B |
| - | - |
| 1 | 2 |
`,
    {},
    [pluginModule]
  )
  expect(result).toBe(`| A | B |
| --- | --- |
| 1 | 2 |
`)
})

it('supports a plugin package name', async () => {
  const result = await format(
    `| A | B |
| - | - |
| 1 | 2 |
`,
    {},
    ['@tofrankie/prettier-plugin-compact-markdown-table']
  )
  expect(result).toBe(`| A | B |
| --- | --- |
| 1 | 2 |
`)
})

it('default compact table keeps one space around cells', async () => {
  const input = `| Name  | Age | City |
| ----- | --- | ---- |
| Alice | 30  | NYC  |
| Bob   | 25  | LA   |
`
  const expected = `| Name | Age | City |
| --- | --- | --- |
| Alice | 30 | NYC |
| Bob | 25 | LA |
`
  expect(await format(input)).toBe(expected)
})

it('compact-no-padding table removes cell padding', async () => {
  const input = `| Name  | Age | City |
| ----- | --- | ---- |
| Alice | 30  | NYC  |
| Bob   | 25  | LA   |
`
  const expected = `|Name|Age|City|
|-|-|-|
|Alice|30|NYC|
|Bob|25|LA|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('aligned table preserves Prettier default', async () => {
  const input = `|Name|Age|City|
|-|-|-|
|Alice|30|NYC|
|Bob|25|LA|
`
  const expected = `| Name  | Age | City |
| ----- | --- | ---- |
| Alice | 30  | NYC  |
| Bob   | 25  | LA   |
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.ALIGNED })).toBe(expected)
})

it('alignment markers in compact-no-padding mode', async () => {
  const input = `| Name | Age | City |
| :--- | :---: | ---: |
| Alice | 30 | NYC |
`
  const expected = `|Name|Age|City|
|:-|:-:|-:|
|Alice|30|NYC|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('alignment markers in compact mode', async () => {
  const input = `| Name | Age | City |
| :--- | :---: | ---: |
| Alice | 30 | NYC |
`
  const expected = `| Name | Age | City |
| :-- | :-: | --: |
| Alice | 30 | NYC |
`
  expect(await format(input)).toBe(expected)
})

it('empty cells in compact-no-padding mode', async () => {
  const input = `| A | B |
| - | - |
|   | x |
`
  const expected = `|A|B|
|-|-|
||x|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('empty cells in compact mode', async () => {
  const input = `| A | B |
| - | - |
|   | x |
`
  const expected = `| A | B |
| --- | --- |
|  | x |
`
  expect(await format(input)).toBe(expected)
})

it('CJK content handled correctly', async () => {
  const input = `| Name | City |
| --- | --- |
| Alice | 東京 |
`
  const expected = `|Name|City|
|-|-|
|Alice|東京|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('single column table', async () => {
  const input = `| a |
| - |
| b |
`
  const expected = `|a|
|-|
|b|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('table with inline formatting', async () => {
  const input = `| Style | Example |
| --- | --- |
| bold | **text** |
| italic | *text* |
| code | \`text\` |
`
  const expected = `|Style|Example|
|-|-|
|bold|**text**|
|italic|_text_|
|code|\`text\`|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('escaped pipes inside cells', async () => {
  const input = `| A | B |
| - | - |
| a\\|b | c |
`
  const expected = `|A|B|
|-|-|
|a\\|b|c|
`
  expect(await format(input, { tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING })).toBe(expected)
})

it('mdx parser produces compact table', async () => {
  const input = `| A | B |
| --- | --- |
| 1 | 2 |
`
  const expected = `|A|B|
|-|-|
|1|2|
`
  expect(
    await format(input, {
      parser: 'mdx',
      tableLayout: TABLE_LAYOUT.COMPACT_NO_PADDING,
    })
  ).toBe(expected)
})

it('aligned with proseWrap never and wide table triggers compaction', async () => {
  const columns = Array.from({ length: 10 }, (_, i) => `Column${i}`)
  const values = Array.from({ length: 10 }, (_, i) => `Value${i}Padding`)
  const input = `| ${columns.join(' | ')} |
| ${columns.map(() => '---').join(' | ')} |
| ${values.join(' | ')} |
`
  const result = await format(input, {
    tableLayout: TABLE_LAYOUT.ALIGNED,
    proseWrap: 'never',
    printWidth: 40,
  })
  expect(result).toContain('|')
  expect(result).not.toMatch(/\|[A-Z][a-z]+\|/)
})
