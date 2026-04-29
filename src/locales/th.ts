import th from 'element-plus/es/locale/lang/th'

Object.assign(th.el, {
  common: {
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    confirmExecute: 'ยืนยันการดำเนินการ?',
    query: 'ค้นหา',
    reset: 'รีเซ็ต',
    tableConfigTitle: 'การตั้งค่าส่วนหัว'
  },
  datepicker: {
    ...th.el.datepicker,
    endPlaceholder: 'วันสิ้นสุด',
    placeholder: 'กรุณาเลือก',
    startPlaceholder: 'วันเริ่มต้น'
  },
  input: {
    placeholder: 'กรุณาป้อนข้อมูล'
  },
  inputNumber: {
    ...th.el.inputNumber,
    placeholder: 'กรุณาป้อนข้อมูล'
  },
  select: {
    ...th.el.select
  },
  uploadOss: {
    placeholder: 'คลิกอัปโหลด'
  },
  validation: {
    cascader: 'กรุณาเลือก{label}',
    checkbox: 'กรุณาเลือก{label}',
    datepicker: 'กรุณาเลือก{label}',
    input: 'กรุณากรอก{label}',
    inputNumber: 'กรุณากรอก{label}',
    select: 'กรุณาเลือก{label}',
    upload: 'กรุณาอัปโหลด{label}'
  }
})

export { th }
