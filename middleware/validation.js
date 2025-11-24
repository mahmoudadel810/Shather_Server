
const reqKeys = ['body', 'params', 'query', 'headers']

export const validateRequest = (schema) =>{
return  (req, res, next) => {
   
    
  reqKeys.forEach((key) => {
    const validationResult= schema[key]?.validate(req[key], { abortEarly: false })
    console.log(validationResult)
    if (validationResult?.error) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.details.map((detail) => detail.message).join(', '),
      })
    }
  })
  next()
}
}

