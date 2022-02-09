const { makeExecutableSchema } =require('@graphql-tools/schema')

const UserModule = require('./user')
const OrderModule = require('./orders')
const ProductModule = require('./products')
const CategoryModule = require('./categories')


module.exports = makeExecutableSchema({
    typeDefs: [
        UserModule.typeDefs,
        OrderModule.typeDefs,
        ProductModule.typeDefs,
        CategoryModule.typeDefs
    ],
    resolvers: [
        UserModule.resolvers,
        OrderModule.resolvers,
        ProductModule.resolvers,
        CategoryModule.resolvers
    ]
})