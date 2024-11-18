export const optionalValidation = (value: number | string) => {
  if (value === null) {
     return true
  } else if (typeof value === 'number') {
     return true
  } else if (typeof value === 'string' && value !== '') {
     return true
  }
  // Add a default return value for all other cases
  return false
 }
