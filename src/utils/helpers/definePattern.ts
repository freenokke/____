import { capitalLetter } from "./capitalLetter"
import { emailInputValidation, textInputValidation } from "./validationTemplates"

export function definePattern(key: string) {
  switch (key) {
    case 'email':
      return {
        fn: emailInputValidation,
        errorMsg: 'Email is not valid'
      }
    default:
      return {
        fn: textInputValidation,
        errorMsg: `${capitalLetter(key)} must have at least 2 and no more than 25 symbols`
      }
  }
}