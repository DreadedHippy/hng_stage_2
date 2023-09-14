import { Response } from "express";
import { httpResponse } from "../interfaces/response";

export class SuccessHandler {
	constructor(){}

	// Send an "OK" response
	Ok(res: Response, data: httpResponse) {
		res.status(200).json(data);
	}

	// A new resource has been created in the database
	resourceCreated(res: Response, data: httpResponse) {
		res.status(201).json(data);
	}

	// A resource has been deleted from the database
	resourceDeleted(res: Response, data: httpResponse) {
		res.status(200).json(data);
	}
}