import en from 'element-plus/es/locale/lang/en'

Object.assign(en.el, {
  common: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    confirmExecute: 'Confirm execution?',
    query: 'Query',
    reset: 'Reset',
    tableConfigTitle: 'Header Settings'
  },
  datepicker: {
    ...en.el.datepicker,
    endPlaceholder: 'End Date',
    placeholder: 'Please select',
    startPlaceholder: 'Start Date'
  },
  input: {
    placeholder: 'Please input'
  },
  inputNumber: {
    ...en.el.inputNumber,
    placeholder: 'Please input'
  },
  select: {
    ...en.el.select
  },
  uploadOss: {
    placeholder: 'Click Upload'
  },
  validation: {
    cascader: 'Please select {label}',
    checkbox: 'Please select {label}',
    datepicker: 'Please select {label}',
    input: 'Please enter {label}',
    inputNumber: 'Please enter {label}',
    select: 'Please select {label}',
    upload: 'Please upload {label}'
  }
})

export { en }
