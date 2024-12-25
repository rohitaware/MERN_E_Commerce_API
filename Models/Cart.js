import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require: true
    },
    title :{type:String,required:true},
    price :{type:Number,required:true},
    qty :{type:Number,required:true},
    imgSrc :{type:String,required:true}
})


const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true
    },
    items :[cartItemSchema]
})


export const Cart = mongoose.model('Cart',cartSchema)