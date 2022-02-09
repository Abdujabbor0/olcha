const {
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground 
} = require('apollo-server-core')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const path = require('path')

const { graphqlUploadExpress } = require ('graphql-upload')


const schema = require('./modules')


async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)

    app.use(graphqlUploadExpress())
    app.use(express.static(path.join(process.cwd(),'files')))

    const server = new ApolloServer({
        introspection: true,
        context: ({ req, res }) => {
            return {
                token: req.headers.token
            }
        },
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start()
    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 8080 }, resolve))
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
}

startApolloServer()