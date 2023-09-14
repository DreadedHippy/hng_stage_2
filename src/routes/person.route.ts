import { Router  } from "express";
import * as PersonController from "../controllers/person.controller";
import { validateId } from "../middleware/paramsValidator";
import { personValidator } from "../middleware/personValidator";
let router = Router();

// router.get("/", (req, res) => {
// 	res.status(200).json({
// 		message: "OK"
// 	})
// })
router.get("/", PersonController.getAllPersons);
router.get("/:id", validateId, PersonController.getSpecificPerson);
router.post("/", personValidator, PersonController.createPerson);
router.patch("/:id", validateId, PersonController.editPerson);
router.delete("/:id", validateId, PersonController.deletePerson);

export default router;