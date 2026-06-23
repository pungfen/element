import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '@/constants'

export const useFormValidation = () => {
  const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)

  if (formItemValidation?.required) {
    const { validator } = formItemValidation

    formItemValidation.validator = () => {
      return validator?.()
    }
  }
}
