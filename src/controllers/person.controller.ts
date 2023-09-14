import { Request, Response } from "express";
import pool, { createPersonInDB, deletePersonFromDB, editPersonInDB, getAllPersonsFromDB, getSpecificPersonFromDB } from "../utils/database";
import { ErrorHandler } from "../utils/errorHandler";
import { Person } from "../interfaces/person";
import { SuccessHandler } from "../utils/successHandler";

let errorHandler = new ErrorHandler();

export async function getAllPersons(req: Request, res: Response) {
  getAllPersonsFromDB()
    .then((result) => {
      res.status(200).json({
        status: true,
        data: result.rows
      })
    })
    .catch((error) => {
      console.log(error);
      errorHandler.genericInternalServerError(res)
    })
}

export async function getSpecificPerson(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  getSpecificPersonFromDB(id)
    .then((result) => {
      let data = {
        status: true,
        data: result.rows[0] || {}
      };
      new SuccessHandler().Ok(res, data);
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function createPerson(req: Request, res: Response) {
  let person: Person = req.body

  createPersonInDB(person)
    .then((results) => {
      let data = {
        status: true,
        message: `Added user with ID: ${results.rows[0].id}`,
        data: results.rows[0]
      }
      new SuccessHandler().resourceCreated(res, data)
    })
    .catch((error) => {
      console.log(error);
      errorHandler.genericInternalServerError(res)
    })
}

export async function editPerson(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let person = req.body;
  person.id = id;

  editPersonInDB(person)
    .then((results) => {
      let data = {
        status: true,
        message: results.rowCount == 0 ? `User with given ID not found, no user updated`: `Modified user with ID: ${id}`,
      };
      new SuccessHandler().Ok(res, data)
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res)
    })
}

export async function deletePerson(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  deletePersonFromDB(id)
    .then((results) => {
      let data = {
        status: true,
        message: results.rowCount == 0 ? `User with given ID not found, no user deleted`: `Deleted user with ID: ${id}`
      }

      new SuccessHandler().resourceDeleted(res, data);
    })
    .catch((error) => {
      errorHandler.genericInternalServerError(res);
    })
}