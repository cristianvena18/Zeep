import Joi from '@hapi/joi';

const schema = Joi.object({
    authorization: Joi.string().min(15).max(30).required().token(),
});

export default schema;