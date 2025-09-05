import type { FlatConfigComposer } from "../node_modules/.pnpm/eslint-flat-config-utils@2.1.0/node_modules/eslint-flat-config-utils/dist/index.mjs"
import { defineFlatConfigs } from "../node_modules/.pnpm/@nuxt+eslint-config@1.4.1_@typescript-eslint+utils@8.34.1_eslint@9.29.0_jiti@2.4.2__typ_69e51b7872fec1441a31497f889b2754/node_modules/@nuxt/eslint-config/dist/flat.mjs"
import type { NuxtESLintConfigOptionsResolved } from "../node_modules/.pnpm/@nuxt+eslint-config@1.4.1_@typescript-eslint+utils@8.34.1_eslint@9.29.0_jiti@2.4.2__typ_69e51b7872fec1441a31497f889b2754/node_modules/@nuxt/eslint-config/dist/flat.mjs"

declare const configs: FlatConfigComposer
declare const options: NuxtESLintConfigOptionsResolved
declare const withNuxt: typeof defineFlatConfigs
export default withNuxt
export { withNuxt, defineFlatConfigs, configs, options }