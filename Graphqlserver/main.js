var { buildSchema } = require("graphql");
const userfunctions = require("./usergraphql")
const productfunctions = require("./productgraphql")
const cartfunctions = require("./cartgraphql")
const orderfunctions = require("./ordergraohql")
const schema  = buildSchema(
    `
    type user {
     name : String 
     email : String 
     username : String
     phonenumber : Int 
     isadmin : Boolean  
     password:String
     token:String
   }
   input newuser {
    name : String ,email : String ,username : String,password:String,phonenumber : Int 
   }
    type review{
     rating :Int 
     comment :String
   }
   type Image {
     public_id :String 
     url:String 
   }
 
      type products {
      name : String
      price : Int
      stock : Int
      description : String
      reviews : review
      rating : String      
      image : Image
      numberofreviews: String
      size:[String]
      category : String
     }
     
     input Review {
       name : String
       rating: Int
        comment :String
     }
     input Images {
       public_id:String
       url:String
     }
     input addpro {
    name:String,price:Int,stock:Int,description:String,reviews:Review,rating:Int,numberofreviews:Int,image:Images,size:[String],category:String
   }
   type cart {
    product_id: [products]
    user_id : String 
    size : String 
    quantity: Int
}

input addcart{
   product_id: ID ,
    user_id : String ,
    size : String ,
    quantity: Int
}
input cartupdate{
   id:ID,
   user_id:ID,
   quantity:Int,
   size:String
}
type order {
                firstname:String
                lastname:String
                email:String
                phonenumber:String
                addressline:String
                city:String
                state:String
                zipcode:String
                country :String
                user_id:ID
                total: Int,
                cartdata:[cart],
}
    input setorder{
              firstname:String,
                lastname:String,
                email:String,
                phonenumber:String,
                addressline:String,
                city:String,
                state:String,
                zipcode:String,
                country :String,
                user_id:ID
}
    type Mutation {
     Productadd(product:addpro):products 
     adduser(users:newuser) : user
     addcart(newadd:addcart):cart
     updatecart(updateinfo:cartupdate):[cart]
     addorder(neworder:setorder):order
    }
    
     type Query {
       getProduct(id:ID!) : products
       getProducts : [products]
        deleteproduct(id:ID!) : products
        getuser(id:ID):user
        getcart(id:ID):[cart]
        deletecart(id:ID):cart
     } 
      `)
 
      var resolvers = {
        getProduct:productfunctions.productget,
        getProducts:productfunctions.getproducts ,
        Productadd:productfunctions.addProduct,
        deleteproduct:productfunctions.deleteproduct,
        adduser:userfunctions.addUsers ,
         getuser:userfunctions.getuser,
         addcart:cartfunctions.addcart,
         getcart:cartfunctions.getcart,
         updatecart:cartfunctions.updatecart,
         deletecart:cartfunctions.deletecart,
         addorder:orderfunctions.addorder

    }
  
 
   var server = {
     schema:schema,
     rootValue:resolvers,
     graphiql:true
   }
 
 
 module.exports = server