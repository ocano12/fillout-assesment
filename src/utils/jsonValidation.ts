import Joi from 'joi';

export const filterClauseSchema = Joi.array().items(
    Joi.object({
        id: Joi.string().required(),
        condition: Joi.string().valid('equals', 'does_not_equal', 'greater_than', 'less_than').required(),
        value: Joi.alternatives(Joi.string(), Joi.number()).required(),
    })
);
