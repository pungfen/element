import zhCn from 'element-plus/es/locale/lang/zh-cn'

Object.assign(zhCn.el, {
  common: {
    cancel: '取消',
    confirm: '确认',
    confirmExecute: '是否执行?',
    query: '查询',
    reset: '重置',
    tableConfigTitle: '表头设置'
  },
  datepicker: {
    ...zhCn.el.datepicker,
    endPlaceholder: '结束日期',
    placeholder: '请选择日期',
    startPlaceholder: '开始日期'
  },
  input: { placeholder: '请输入' },
  inputNumber: {
    ...zhCn.el.inputNumber,
    placeholder: '请输入'
  },
  select: {
    ...zhCn.el.select
  },
  uploadOss: {
    placeholder: '点击上传'
  },
  validation: {
    cascader: '请选择{label}',
    checkbox: '请选择{label}',
    datepicker: '请选择{label}',
    input: '请填写{label}',
    inputNumber: '请填写{label}',
    select: '请选择{label}',
    upload: '请上传{label}'
  }
})

export { zhCn }
