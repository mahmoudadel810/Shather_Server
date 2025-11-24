import JOI from 'joi';


export const registerSchema = JOI.object({
  name: JOI.string().min(3).max(30).trim().required(),
  email: JOI.string().email().required(),
  password: JOI.string().min(6).max(128).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')),
  rePassword: JOI.string().valid(JOI.ref('password')).min(6).max(128).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')),
  phone: JOI.string().min(10).max(15).required(),
});

export const loginSchema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().min(6).max(128).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')),
});
