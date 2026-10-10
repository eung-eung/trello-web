export const FIELD_REQUIRED_MESSAGE = 'This field is required'
export const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const EMAIL_RULE_MESSAGE = 'Please enter a valid email address'
export const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/
export const PASSWORD_RULE_MESSAGE = 'Password must be at least 8 characters long and contain at least one letter and one number'
export const PASSWORD_CONFIRM_RULE_MESSAGE = 'Passwords do not match'

//validate file
export const LIMIT_COMMON_FILE_SIZE = 10485760 //10mb
export const ALLOW_COMMON_TYPE = ['image/jpg', 'image/png', 'image/jpeg']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.type) {
    return 'File cannot be blank'
  }

  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file is exceeded. (10mb)'
  }

  if (!ALLOW_COMMON_TYPE.includes(file.type)) {
    return 'File type is invalid. Only accept jpg, jpeg, png'
  }
  return null
}