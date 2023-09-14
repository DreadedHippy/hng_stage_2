import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { personSchema } from "../schemas/person.schema"

export async function personValidator(req: Request, res: Response, next: NextFunction) {
	let postValidation = personSchema.validate(req.body);

	if (postValidation.error) {
		new ErrorHandler().badRequest(res, {
			status: false,
			message: `Could not create post, ${postValidation.error.message ? postValidation.error.message : postValidation.error.details[0].message}`
		})
		return
	}
	

	next();
}