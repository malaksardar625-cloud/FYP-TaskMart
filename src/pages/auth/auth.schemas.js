import Joi from 'joi'

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Enter a valid email address',
      'string.empty': 'Email is required',
    }),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .lowercase()
    .required()
    .messages({
      'string.alphanum': 'Only letters and numbers allowed',
      'string.min': 'At least 3 characters',
      'string.max': 'Max 30 characters',
      'string.empty': 'Username is required',
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'At least 6 characters',
    'string.empty': 'Password is required',
  }),
  retypePassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Please confirm your password',
  }),
})

export const loginSchema = Joi.object({
  identifier: Joi.string().required().messages({
    'string.empty': 'Email or userName is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Enter a valid email address.',
      'any.required': 'Email is required.',
    }),
})

export const verifyOtpSchema = Joi.object({
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'OTP is required.',
      'string.length': 'OTP must be exactly 6 digits.',
      'string.pattern.base': 'OTP must contain numbers only.',
      'any.required': 'OTP is required.',
    }),
})

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 8 characters.',
      'string.max': 'Password must not exceed 64 characters.',
      'string.pattern.base': 'Must include uppercase, lowercase, and a number.',
      'any.required': 'Password is required.',
    }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match.',
    'string.empty': 'Please confirm your password.',
    'any.required': 'Please confirm your password.',
  }),
})
