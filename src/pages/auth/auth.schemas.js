import Joi from 'joi'

const passwordSchema = Joi.string()
  .min(8)
  .max(64)
  .pattern(/[a-z]/)
  .pattern(/[A-Z]/)
  .pattern(/[0-9]/)
  .pattern(/[@$!%*?&]/)
  .required()
  .messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters.',
    'string.max': 'Password must not exceed 64 characters.',
    'string.pattern.base':
      'Password must include uppercase, lowercase, number, and special character (@$!%*?&).',
    'any.required': 'Password is required.',
  })

// ── SCHEMAS ───────────────────────────────────────────────────

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Enter a valid email address.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
    }),
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .lowercase()
    .required()
    .messages({
      'string.alphanum': 'Only letters and numbers allowed.',
      'string.min': 'At least 3 characters.',
      'string.max': 'Max 30 characters.',
      'string.empty': 'Username is required.',
      'any.required': 'Username is required.',
    }),
  password: passwordSchema,
  retypePassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match.',
    'string.empty': 'Please confirm your password.',
    'any.required': 'Please confirm your password.',
  }),
})

export const loginSchema = Joi.object({
  identifier: Joi.string().required().messages({
    'string.empty': 'Email or username is required.',
    'any.required': 'Email or username is required.',
  }),
  // No pattern restriction — login must accept any password the user typed
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
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
  password: passwordSchema,
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match.',
    'string.empty': 'Please confirm your password.',
    'any.required': 'Please confirm your password.',
  }),
})
