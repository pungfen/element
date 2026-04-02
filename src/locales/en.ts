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
  }
})

export { en }
