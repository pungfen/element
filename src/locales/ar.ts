import ar from 'element-plus/es/locale/lang/ar'

Object.assign(ar.el, {
  input: {
    placeholder: 'الرجاء إدخال'
  },
  inputNumber: {
    ...ar.el.inputNumber,
    placeholder: 'الرجاء إدخال'
  },
  datepicker: {
    ...ar.el.datepicker,
    placeholder: 'الرجاء اختيار',
    startPlaceholder: 'تاريخ البدء',
    endPlaceholder: 'تاريخ الانتهاء'
  },
  select: {
    ...ar.el.select
  },
  uploadOss: {
    placeholder: 'انقر للتحميل'
  },
  common: {
    query: 'استعلام',
    reset: 'إعادة تعيين',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    confirmExecute: 'تأكيد التنفيذ؟'
  },
  validation: {
    input: 'يرجى إدخال{label}',
    inputNumber: 'يرجى إدخال{label}',
    checkbox: 'يرجى تحديد{label}',
    select: 'يرجى تحديد{label}',
    datepicker: 'يرجى تحديد{label}',
    upload: 'يرجى رفع{label}'
  }
})

export { ar }
