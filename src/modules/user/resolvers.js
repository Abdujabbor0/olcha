const model = require('./model.js')
const jwt =require ('jsonwebtoken')

module.exports = {
	Query: {
		users:  async(_, { userId }) => await model.users({ userId })
	},
	Mutation:{
		register:async (_,{ user_name,password,user_contact,email })=>{
            try{
                if (!user_name || user_name.length>25) throw new Error ('the user name not suitable')
                if (!password) throw new Error("the password is required!")
                if (!user_contact) throw new Error("the contact is required!")
                if (!email) throw new Error("the email is required!")
			    const registered_user=await model.register({ user_name,password,user_contact,email })
			    return {
				    status: 200,
				    message: "The user has succesfully registered!",
				    data: {},
                    token: jwt.sign({ user_id : registered_user.user_id }, "secret_key")
			    }
            }catch(error){
                return {
                    status: 400,
                    message:error.message
                }
            }
		},
        login: async(_, { user_name,password }) => {
			try{
				if(!user_name) throw new Error("The user name is required!")
				if(!password) throw new Error("The user password is required!")
			    const [logged_user]= await model.login(user_name,password)
                if(!logged_user.user_name == user_name) throw new Error("There is no such a user")
				if(logged_user.role ==true)return {
					status: 200,
					message: "The user has succesfully logged!",
					data: "admin",
                    token: jwt.sign({ admin : 'admin' }, "secret_key")
				}
                else{
                    return {
                        status: 200,
                        message: "The user has succesfully logged!",
                        data:"user",
                        token: jwt.sign({ user_id : logged_user.user_id }, "secret_key")
                    }
                }
			} catch(error){
				return {
					status: 400,
					message: error.message
				}
			}
		},
        
		// changeUser:(_,{user_id,user_name,password,email,user_fullname,active})=>{
		// 	model.change({
		// 		user_id,user_name,password,email,user_fullname,active
		// 	})
		// 	return{
		// 		status: 200,
		// 		message: "The user has succesfully changed!",
		// 		data: {
		// 			user_id
		// 		}
		// 	}
		// },
		// deleteUser:(_,{user_id})=>{
		// 	model.delet({
		// 		user_id
		// 	})
		// 	return{
		// 		status:200,
		// 		message:"The user has been deleted",
		// 		data:{
		// 			user_id
		// 		}
		// 	}
		// }

	}

	// User: {
	// 	user_id: global => global.user_id
	// }
}