
export interface FormItems {
  id: string;
  comName: string
  name: string
  hideLabel: boolean
  label: string
  rules: []
  required?: boolean
  hidden?: boolean
  ifFormItem?: boolean
}

export type Data = any


export enum RuleKeys {
  REQUIRED = 'required',
  MIN = 'min',
  MAX = 'max',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  REG_EXP = 'regExp',
  CODE_VALIDATOR = 'codeValidator',
  Email_VALIDATOR = 'emailValidator',
  PHONE_NUMBER_VALIDATOR = 'phoneNumberValidator'
}