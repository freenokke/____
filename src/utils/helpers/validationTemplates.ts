const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const textInputValidation = (str: string) => !!(str && (str.length >= 2 && str.length < 25))
export const emailInputValidation = (email: string) => !!(email && EMAIL_REGEXP.test(email));