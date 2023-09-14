import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { ErrorHandler } from './errorHandler';
import { Person } from '../interfaces/person';
dotenv.config();

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASS,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	port: 5432
})

export function getAllPersonsFromDB(): Promise<QueryResult>{
	return new Promise((resolve, reject) => {
		pool.query('SELECT * FROM persons ORDER BY id ASC', (error, results) => {
			if (error) {
				reject(error)
			}
	
			resolve(results)
		})

	})
}

export function getSpecificPersonFromDB(id: number): Promise<QueryResult>{
	return new Promise((resolve, reject) => {	
		pool.query('SELECT * FROM persons where id = $1',[id], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results)
		})

	})
}

export function createPersonInDB(person: Person): Promise<QueryResult>{
	let {name} = person;
	return new Promise((resolve, reject) => {	
		pool.query('INSERT INTO persons (name) VALUES ($1) RETURNING *', [name], (error, results) => {
			if (error) {      
				reject(error)
			}
			resolve(results)
		})

	})
}


export function editPersonInDB(person: Person): Promise<QueryResult>{
	let {name, id} = person;
	return new Promise((resolve, reject) => {	
		pool.query(
			'UPDATE persons SET name = COALESCE($1, name) WHERE id = $2',
			[name, id],
			(error, results) => {
				if (error) {      
					reject(error)
				}
				resolve(results)
			}
		)

	})
}

export function deletePersonFromDB(id: number): Promise<QueryResult>{
	return new Promise((resolve, reject) => {	
		pool.query(
			'DELETE FROM persons WHERE id = $1',
			[id],
			(error, results) => {
				if (error) {      
					reject(error)
				}
				resolve(results)
			}
		)
	})
}

export default pool;