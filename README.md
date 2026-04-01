# @pungfe/element

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

基于 [Vue 3](https://vuejs.org/) 与 [Element Plus](https://element-plus.org/) 的组件库：在 Element Plus 之上提供带 **X** 前缀的封装组件（如 `XButton`、`XForm`、`XTable`），并可选注册一组进阶组件（请求表格、异步按钮、OSS 上传等）。

## 特性

- **与 Element Plus 对齐**：封装层透传常用 Props / 事件，默认行为可通过全局配置微调（如按钮中文空格、表格溢出提示）。
- **基础组件**：表单、表格、上传、分页等常用控件的 X 系列封装，开箱即用。
- **进阶组件（可选）**：通过 `install` 的 `advance: true` 注册，适合列表请求、表单提交、OSS 等场景。
- **按需样式**：提供 `unplugin-vue-components` 解析器，自动解析组件并引入对应 Element Plus 的 CSS 副作用路径。
- **TypeScript**：导出类型声明；为全局组件提供类型补充。
- **国际化**：内置在 Element Plus 语言包上扩展的 `en`、`zhCn` 文案。

## 环境要求

请与下列 **peerDependencies** 版本保持一致（或兼容范围）：

| 包 | 版本 |
| --- | --- |
| `vue` | `^3.5.27` |
| `element-plus` | `^2.13.1` |

## 安装

```bash
npm i @pungfe/element element-plus vue
```

## 快速开始

全局注册插件（默认只注册**基础组件**）；同时引入本库样式（内含 Tailwind 等构建产物）：

```ts
import Element from '@pungfe/element'
import { createApp } from 'vue'
import App from './App.vue'
import '@pungfe/element/style.css'

const app = createApp(App)

app.use(Element)
```

### 注册进阶组件

进阶组件包含如 `XTableRequestNext`、`XFormRequestNext`、`XUploadOssNext` 等，需显式开启：

```ts
app.use(Element, { advance: true })
```

### 全局配置 `ElementConfig`

安装时可传入 `config`，用于合并默认的按钮、表格等全局行为（具体字段见包内导出的 `ElementConfig` 类型）：

```ts
app.use(Element, {
  config: {
    button: { autoInsertSpace: false },
    table: { showOverflowTooltip: false }
    // oss: { ... } // 供上传等进阶能力使用
  }
})
```

### 国际化（Element Plus）

从本库导出扩展后的语言包，配合 `el-config-provider` 使用：

```ts
import { zhCn } from '@pungfe/element'

// 在模板中：<el-config-provider :locale="zhCn">...</el-config-provider>
```

英文为 `en`。

## 按需引入（推荐）

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 时，可引入解析器，自动处理组件与 Element Plus 样式副作用：

```ts
import ElementResolver from '@pungfe/element/resolver'
import Components from 'unplugin-vue-components/vite'

// vite.config.ts 示例
export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        ElementResolver()
        // 若使用进阶组件：
        // ElementResolver({ advance: true })
      ]
    })
  ]
})
```

模板中直接使用 `XButton`、`XTable` 等即可；进阶组件解析需 `ElementResolver({ advance: true })`。

## 子路径导出

| 路径 | 说明 |
| --- | --- |
| `@pungfe/element` | 默认入口：`install`、基础组件、类型、语言包 |
| `@pungfe/element/advance` | 仅进阶组件（按需静态导入时使用） |
| `@pungfe/element/resolver` | `unplugin-vue-components` 解析器 |
| `@pungfe/element/style.css` | 本库样式 |

## 组件一览

**基础**：`XButton`、`XCascader`、`XCheckbox`、`XConfigProvider`、`XDatePicker`、`XDialog`、`XForm`、`XFormItem`、`XInput`、`XInputNumber`、`XPagination`、`XSelect`、`XTable`、`XTabs`、`XTabPane`、`XUpload`。

**进阶**（`advance: true`）：`XButtonAsync`、`XButtonConfirm`、`XCascaderRequest`、`XFormFlex`、`XFormRequestNext`、`XRequest`、`XSelectRequest`、`XTableFlex`、`XTableRequestNext`、`XTableRequestConfigNext`、`XUploadOssNext`。

## 本地开发

```bash
npm ci
npm run build    # 输出 dist/（es、cjs、types）
npm run lint     # ESLint
npm run typecheck
npm run test     # Vitest
```

发布流程可通过 `npm run release`（先构建再使用 bumpp 升版）完成；CI 在指向 `main` 的 Push / PR 上会执行 lint、typecheck 与 build。

## License

[MIT](./LICENSE) License 2026 [FP](https://github.com/pungfe)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@pungfe/element.svg
[npm-version-href]: https://npmjs.com/package/@pungfe/element
[npm-downloads-src]: https://img.shields.io/npm/dm/@pungfe/element
[npm-downloads-href]: https://www.npmcharts.com/compare/@pungfe/element?interval=30

<!-- npm publish --access public --tag alpha -->
