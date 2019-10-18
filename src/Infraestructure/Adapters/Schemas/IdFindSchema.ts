import Joi from '@hapi/joi';

const schema = Joi.object({
    id: Joi.number().min(0).required()
});

export default schema;