const order = require("../models/ordermodel");
const validation = require("../validation.js/ordervalidation")
const ordermails = require("../email.js/orderemail")
const cart = require("../models/cartmodel")
class orderfunctions {
    static addorder = async (args) => {
        try {
            await validation.addorder(args.neworder)
            const {
                firstname,
                lastname,
                email,
                phonenumber,
                addressline,
                city,
                state,
                zipcode,
                country,
                user_id
            } = args.neworder
            const usercart = await cart.find({ user_id: args.neworder.user_id }).populate("product_id")
            if (!usercart) {
                return "cart not found"
            }
            let totalprice = 0;
            for (let i = 0; i < usercart.length; i++) {
                totalprice += usercart[i].quantity * usercart[i].product_id[0].price
            }


            const neworder = await new order({
                firstname,
                lastname,
                email,
                phonenumber,
                addressline,
                city,
                state,
                zipcode,
                country,
                total: totalprice,
                cartdata:usercart,
                user_id
            })
            console.log(usercart)
            await neworder.save()
            await ordermails.ordersuccess(email, neworder._id, totalprice)
            return neworder
        }

        catch (err) {
            return err
        }


    }



}

module.exports = orderfunctions