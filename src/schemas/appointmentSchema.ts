import Joi from "joi";

// Definir el esquema de validación
export const appointmentSchema = Joi.object({
  insuredId: Joi.string()
    .regex(/^\d{5}$/)
    .required()
    .messages({
      "string.pattern.base": "El insuredId debe ser un código de 5 dígitos",
    }),
  scheduleId: Joi.number().integer().positive().required(),
  countryISO: Joi.string().valid("PE", "CL").required(),
});
