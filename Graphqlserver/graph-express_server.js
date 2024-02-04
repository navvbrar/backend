const express_graphql = require("express-graphql").graphqlHTTP;
const app = require("../app.js")

const graphserver = async(server,middleware)=>{
  
  app.use("/graphql",express_graphql(server))

}
module.exports= graphserver