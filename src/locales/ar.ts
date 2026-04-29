import ar from 'element-plus/es/locale/lang/ar'

Object.assign(ar.el, {
  common: {
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    confirmExecute: 'تأكيد التنفيذ؟',
    query: 'استعلام',
    reset: 'إعادة تعيين',
    tableConfigTitle: 'إعدادات رؤوس الأعمدة'
  },
  datepicker: {
    ...ar.el.datepicker,
    endPlaceholder: 'تاريخ الانتهاء',
    placeholder: 'الرجاء اختيار',
    startPlaceholder: 'تاريخ البدء'
  },
  input: {
    placeholder: 'الرجاء إدخال'
  },
  inputNumber: {
    ...ar.el.inputNumber,
    placeholder: 'الرجاء إدخال'
  },
  select: {
    ...ar.el.select
  },
  uploadOss: {
    placeholder: 'انقر للتحميل'
  },
  validation: {
    cascader: 'يرجى تحديد{label}',
    checkbox: 'يرجى تحديد{label}',
    datepicker: 'يرجى تحديد{label}',
    input: 'يرجى إدخال{label}',
    inputNumber: 'يرجى إدخال{label}',
    select: 'يرجى تحديد{label}',
    upload: 'يرجى رفع{label}'
  }
})

export { ar }
