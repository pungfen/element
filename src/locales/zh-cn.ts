import zhCn from 'element-plus/es/locale/lang/zh-cn'

Object.assign(zhCn.el, {
  input: { placeholder: '请输入' },
  inputNumber: {
    ...zhCn.el.inputNumber,
    placeholder: '请输入'
  },
  datepicker: {
    ...zhCn.el.datepicker,
    placeholder: '请选择日期',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  },
  select: {
    ...zhCn.el.select
  },
  uploadOss: {
    placeholder: '点击上传'
  }
})

export { zhCn }
