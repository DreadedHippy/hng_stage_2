import Joi from "joi";

let personSchema = Joi.object({
	name: Joi.string().required()
})

export {personSchema}