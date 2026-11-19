---
name: request-component-development
description: Implement request-backed tables, forms, selects, and controls using this project's host-provided reactive request contract.
---

# Request Component Development

Use this skill for `XRequest`, `XFormRequest`, `XTableRequest`, `XTableRequestConfig`, `XSelectRequest`, `XCascaderRequest`, or new components that wrap asynchronous data.

## Core Contract

Request components do not own an HTTP client. They receive a `request()` factory implemented by the host application.

The factory supplies reactive values and an executor:

```ts
request: () => ({
  data: Ref<D>,
  execute: () => PromiseLike<unknown>,
  isFetching: Ref<boolean>,
  paging: Ref<Paging>,
  path: Ref<PT>,
  query: Ref<QR>,
  url: U,
})
```

The exact shape may omit fields that are irrelevant to a specific component, such as `paging` in a form request.

Do not replace this contract with direct `fetch`, Axios, or a repository-specific API client. Keeping transport in the host allows this package to remain application-agnostic.

## Search and Prepare

Search operations should:

1. be debounced with `useDebounceFn`;
2. emit `prepare` before `execute`;
3. pass the current reactive `path` and `query`;
4. retain a reference to the original query for reset;
5. reset pagination when the filter/query meaningfully changes.

Pattern:

```ts
const initialQuery = JSON.stringify(query.value)

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  await execute()
})

const reset = useDebounceFn(async () => {
  query.value = JSON.parse(initialQuery) as QR
  await search()
})
```

Keep return values from `execute()` awaitable. Do not turn asynchronous errors into success-shaped fallbacks.

## Pagination

The package uses the shared `Paging` shape:

```ts
interface Paging {
  itemCount: number
  pageIndex: number
  pageSize: number
}
```

When page size changes:

- set query `pageIndex` to `1` using the component's existing pagination convention;
- update query page size;
- execute the request.

When only the page index changes, update query `pageIndex` and execute without clearing filters.

## Loading and Layout

- Apply `v-loading` at the component region representing the request lifecycle.
- Disable request form controls when `isFetching` is true.
- Keep table containers in a flex column with overflow controlled at the outer boundary.
- Expose request state and controls needed by consumers, such as `search`, `reset`, `data`, `query`, `path`, and `paging`.

## Configurable Tables

`XTableRequestConfig` adds persisted column metadata:

```ts
fields: () => ({
  data: Ref<TableColumnField[]>,
  loading: Ref<boolean>,
  update: (fields: TableColumnField[]) => PromiseLike<unknown>,
})
```

The component derives:

- visible columns;
- searchable columns;
- column order;
- persisted widths;
- optional selection column.

Do not mutate or recreate unrelated field metadata. After reorder, width change, or visibility change, call `update(fieldsData.value)` only after the Vue state mutation is scheduled correctly.

## Testing

Use refs and a fake executor to verify:

- `prepare` observes current values before `execute`;
- reset restores initial query state;
- pagination updates query and requests the new page;
- loading state is bound to the correct subtree;
- exposed references remain reactive.

Keep API transport details in Playground utilities rather than package tests.

