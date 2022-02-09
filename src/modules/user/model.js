const { fetch, fetchAll } = require('../../utils/postgress.js')

const USERS = `
	SELECT
		user_id,
		user_name,
		user_contact,
		email,
		role
	FROM users
	WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN (
			user_name ILIKE CONCAT('%', $2, '%')
		) ELSE TRUE
	END 
    ORDER BY user_id
    
`
const REGISTER=`
	insert into users(user_name,password,user_contact,email) values ($1,$2,$3,$4)
    returning *
`

const LOGIN=`
    SELECT
        user_id,
        user_name,
        password,
        user_contact,
        email,
        role
    FROM users
    WHERE user_name = $1 AND password = crypt($2, password) 
`


function users ({ search, userId }) {
	return fetchAll(USERS, userId, search)
}

function register ({ user_name,password,user_contact,email }) {
	return fetchAll(REGISTER, user_name,password,user_contact,email)
}

function login ( user_name,password ) {
	return fetchAll(LOGIN, user_name,password)
}


module.exports = {
	users,
    register,
    login
}