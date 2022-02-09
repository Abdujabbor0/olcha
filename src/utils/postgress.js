const { Pool } = require('pg')
// const { default: model } = require('../../../dars-78/src/utils/postgres')

const pool = new Pool({
    connectionString:'postgres://bcimxdwc:rh5fFrMNoYGmMzdA2tqHBNnhK4cuOevV@john.db.elephantsql.com/bcimxdwc',
})


async function fetch(query, ...params) {
	const client = await pool.connect()
	try {
		const { rows: [ row ] } = await client.query(query, params.length ? params : null)
		return row
	} catch(error) {
		console.log(error)
	} finally {
		client.release()
	}
}


async function fetchAll(query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch(error) {
		console.log(error)
	} finally {
		client.release()
	}
}

module.exports = {
    fetch,
    fetchAll
}