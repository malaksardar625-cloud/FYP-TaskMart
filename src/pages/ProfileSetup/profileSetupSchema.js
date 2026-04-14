import Joi from 'joi'

export const profileSetupSchema = Joi.object({
  profileImage: Joi.any()
    .optional()
    .custom((value, helpers) => {
      if (!value || !value[0]) return value
      const file = value[0]
      const allowed = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowed.includes(file.type)) {
        return helpers.error('any.invalid')
      }
      if (file.size > 3 * 1024 * 1024) {
        return helpers.error('any.invalid')
      }
      return value
    })
    .messages({
      'any.invalid': 'Only JPEG or PNG allowed. Max size is 3MB.',
    }),

  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.empty': 'Full name is required.',
      'string.min': 'Full name must be at least 2 characters.',
      'string.max': 'Full name must not exceed 50 characters.',
      'string.pattern.base': 'Full name can only contain letters and spaces.',
      'any.required': 'Full name is required.',
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-().]{7,20}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Enter a valid phone number (7–20 digits).',
    }),

  bio: Joi.string().trim().max(500).optional().allow('').messages({
    'string.max': 'Bio must not exceed 500 characters.',
  }),

  country: Joi.string().trim().required().messages({
    'string.empty': 'Please select a country.',
    'any.required': 'Please select a country.',
  }),

  city: Joi.string().trim().max(100).optional().allow('').messages({
    'string.max': 'City must not exceed 100 characters.',
  }),

  address: Joi.string().trim().max(200).optional().allow('').messages({
    'string.max': 'Address must not exceed 200 characters.',
  }),
})
