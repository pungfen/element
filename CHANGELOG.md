## [0.6.6](https://github.com/pungfen/element/compare/v0.6.5...v0.6.6) (2026-06-26)

## 0.9.0

### Minor Changes

- eca237b: Expose `clearSelection` method on `XTableRequest` component, allowing parent components to programmatically clear table selections.

## 0.8.2

### Patch Changes

- 3c7f08c: fix(basic): correct InputNumber required validation for zero value

## 0.8.1

### Patch Changes

- 56fb1b8: fix(basic): add clear event and fix range value clearing in DatePicker

## 0.8.0

### Minor Changes

- 7079ed3: feat(advance): add fit prop passthrough to XTableRequestConfig

## 0.7.0

### Minor Changes

- ec6099e: Replace XTableFlex with XTable in XTableRequestConfig and use `useElementSize` for dynamic height. Expose `scrollBarRef` (replaces `container`) from XTableFlex and `table` ref from XTableRequestConfig. Add `rowClassName`, `rowStyle` props and `rowClick`, `rowDblclick`, `selectionChange` events.

## 0.6.9

### Patch Changes

- 5aed5b2: Expose `scrollBarRef` from XTable and forward full `ScrollbarScrollEvent` in `@scroll` event instead of only `{scrollLeft, scrollTop}`.

## 0.6.8

### Patch Changes

- b464fbb: 暴露 XTableFlex 组件的 container 引用

## 0.6.7

### Patch Changes

- 10f54d7: 补充 Table 组件 scroll 事件在 advance 表格中的透传

### Features

- **Table.vue:** 新增 onScroll 监听事件 ([1bf39f9](https://github.com/pungfen/element/commit/1bf39f9c03bbfc72236d3e1d8f4f8f81715e5b54))
