import th from 'element-plus/es/locale/lang/th'

Object.assign(th.el, {
  input: {
    placeholder: 'กรุณาป้อนข้อมูล'
  },
  inputNumber: {
    ...th.el.inputNumber,
    placeholder: 'กรุณาป้อนข้อมูล'
  },
  datepicker: {
    ...th.el.datepicker,
    placeholder: 'กรุณาเลือก',
    startPlaceholder: 'วันเริ่มต้น',
    endPlaceholder: 'วันสิ้นสุด'
  },
  select: {
    ...th.el.select
  },
  uploadOss: {
    placeholder: 'คลิกอัปโหลด'
  },
  common: {
    query: 'ค้นหา',
    reset: 'รีเซ็ต',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    confirmExecute: 'ยืนยันการดำเนินการ?'
  },
  validation: {
    input: 'กรุณากรอก{label}',
    inputNumber: 'กรุณากรอก{label}',
    checkbox: 'กรุณาเลือก{label}',
    cascader: 'กรุณาเลือก{label}',
    select: 'กรุณาเลือก{label}',
    datepicker: 'กรุณาเลือก{label}',
    upload: 'กรุณาอัปโหลด{label}'
  }
})

export { th }
