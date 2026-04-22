import en from 'element-plus/es/locale/lang/en'

Object.assign(en.el, {
  input: {
    placeholder: 'Please input'
  },
  inputNumber: {
    ...en.el.inputNumber,
    placeholder: 'Please input'
  },
  datepicker: {
    ...en.el.datepicker,
    placeholder: 'Please select',
    startPlaceholder: 'Start Date',
    endPlaceholder: 'End Date'
  },
  select: {
    ...en.el.select
  },
  uploadOss: {
    placeholder: 'Click Upload'
  },
  common: {
    query: 'Query',
    reset: 'Reset',
    cancel: 'Cancel',
    confirm: 'Confirm',
    confirmExecute: 'Confirm execution?',
    tableConfigTitle: 'Header Settings'
  },
  validation: {
    input: 'Please enter {label}',
    inputNumber: 'Please enter {label}',
    checkbox: 'Please select {label}',
    cascader: 'Please select {label}',
    select: 'Please select {label}',
    datepicker: 'Please select {label}',
    upload: 'Please upload {label}'
  }
})

export { en }
