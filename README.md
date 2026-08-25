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
- **国际化**：内置在 Element Plus 语言包上扩展的 `en`、`zhCn`、`ar`、`th` 文案。

## 环境要求

请与下列 **peerDependencies** 版本保持一致（或兼容范围）：

| 包             | 版本      |
| -------------- | --------- |
| `vue`          | `^3.5.27` |
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

import '.../tailwind.css'
import '.../cover.css'

// 该组件库的style.css 建议放在tailwind入口css和项目覆盖css之后
import '@pungfe/element/style.css'

const app = createApp(App)

app.use(Element)
```

同时请确保 **Element Plus** 的样式已按需或全量引入（例如全量：`import 'element-plus/dist/index.css'`）；若仅用 `unplugin-vue-components` + 本库解析器，一般由解析器为各组件注入 Element Plus 的 CSS 副作用路径。

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
import { zhCn } from '@pungfe/element/locales'

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

| 路径                        | 说明                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| `@pungfe/element`           | 默认入口：`install`、`ElementConfig` 等类型（不含语言包，见下）           |
| `@pungfe/element/basic`     | 基础 X 组件具名导出；含 `GlobalComponents` 类型补充（按需静态导入）       |
| `@pungfe/element/advance`   | 进阶组件具名导出；含对应 `GlobalComponents` 类型补充（按需静态导入）      |
| `@pungfe/element/locales`   | 扩展后的 `en`、`zhCn`（配合 `el-config-provider`）                        |
| `@pungfe/element/resolver`  | `unplugin-vue-components` 解析器（基础从 `basic`、进阶从 `advance` 解析） |
| `@pungfe/element/style.css` | 本库样式                                                                  |

## 组件一览

**基础**：`XButton`、`XCascader`、`XCheckbox`、`XConfigProvider`、`XDatePicker`、`XDialog`、`XForm`、`XFormItem`、`XInput`、`XInputNumber`、`XPagination`、`XSelect`、`XTable`、`XTabs`、`XTabPane`、`XUpload`。

**进阶**（`advance: true`）：`XButtonAsync`、`XButtonConfirm`、`XCascaderRequest`、`XFormFlex`、`XFormRequestNext`、`XRequest`、`XSelectRequest`、`XTableFlex`、`XTableRequestNext`、`XTableRequestConfigNext`、`XUploadOssNext`。

## 本地开发

```bash
pnpm install
pnpm build       # 输出 dist
pnpm lint        # ESLint
pnpm typecheck
pnpm test        # Vitest（watch）
```

### 发布流程

本项目使用 Changesets 管理版本和发布。功能改动需要同时添加 Changeset：

```bash
pnpm changeset add       # 选择 patch、minor 或 major，并填写变更说明
pnpm changeset status    # 检查待发布版本
```

将源码和 Changeset 一起提交，并通过 Pull Request 合并到 `main`。合并后，GitHub Actions 会执行发布流程，负责生成版本提交、更新 `CHANGELOG.md`、创建版本标签并发布到 npm。不要手动修改 `package.json` 版本号，也不要使用 `bumpp` 或直接推送 `main`。

发布 workflow 使用 npm Trusted Publishing。首次启用前，需要在 npm 包设置中将本仓库的 `main` 分支与 `.github/workflows/release.yml` 配置为 trusted publisher。

分支约定：`dev` 只用于日常开发，`main` 是唯一发布分支。所有进入 `main` 的改动必须通过 Pull Request，不直接推送或 force-push。版本标签由 Changesets 自动生成，格式为 `@pungfe/element@<version>`，不要手动创建另一套标签。

### 发布失败恢复

- 没有生成 release PR：确认源码改动包含 `.changeset/*.md`，并在 PR 中运行 `pnpm changeset status`。
- 已生成版本提交但 npm 发布失败：先修复 Actions 报错并重新运行 workflow，不要手动改版本号或重复创建 Changeset。
- npm 已发布但缺少 Git tag：不要重复发布相同版本，先核对 `package.json`、npm 和对应提交，再补齐 tag 或修复 workflow。
- `dev` 与 `main` 不一致：先从远程更新分支，通过 Pull Request 合并，不要用 force-push 覆盖远程历史。

### 静态按需导入

未使用 `app.use` 全局注册时，可从子路径具名导入基础或进阶组件（与解析器 `from` 一致）：`@pungfe/element/basic`、`@pungfe/element/advance`。

## License

[MIT](./LICENSE) License 2026 [FP](https://github.com/pungfe)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@pungfe/element.svg
[npm-version-href]: https://npmjs.com/package/@pungfe/element
[npm-downloads-src]: https://img.shields.io/npm/dm/@pungfe/element
[npm-downloads-href]: https://www.npmcharts.com/compare/@pungfe/element?interval=30
