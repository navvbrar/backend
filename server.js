const app = require("./app.js");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })
const port = process.env.PORT;
const connectdb = require("./database.js")
var bodyParser = require('body-parser')
 const productserver = require("./Graphqlserver/productgraphql.js")
 const userserver = require("./Graphqlserver/usergraphql.js")
 const graphserver= require("./Graphqlserver/graph-express_server.js")
 const server = require("./Graphqlserver/main.js")
 graphserver(server)


 
connectdb();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use("/api/account", require("./routes/userroutes.js"))
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/product", require("./routes/productroutes.js"))
app.use("/api/cart", require("./routes/cartroute.js"))
app.use("/api/search", require("./routes/search.js"))
app.use("/api/order", require("./routes/orderroutes.js"))
app.use("/api/review",require("./routes/reviewroutes.js"))
app.use("/api/promotion",require("./routes/promotionroute.js"))

app.listen(port, (req, res) => {

  console.log(`listening at ${port}`)
})