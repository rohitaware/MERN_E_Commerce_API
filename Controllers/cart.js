import { Cart } from "../Models/Cart.js";

//Add to Cart
export const addToCart = async(req,res)=>{
    const {productId,title,price,qty,imgSrc} = req.body

    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
        cart = new Cart({userId,items:[]})

    }
    const itemIndex = cart.items.findIndex((item)=>item.productId.toString() === productId);

    if(itemIndex > -1){
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price*qty;
    }
    else{
        cart.items.push({productId,title,price,qty,imgSrc});
    }

  

    

    await cart.save();
    res.json({message:'Items Added To Cart',cart})
}

//Get user cart
export const userCart = async(req,res)=>{

    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'Cart Not found'})

        res.json({message:'User Cart',cart});
       
}

//remove product from cart
export const removeProductFromCart = async(req,res)=>{
    const productId = req.params.productId;

    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'Cart Not found'});

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId);

    await cart.save()

        res.json({message:'Product Remove from Cart'});
       
}

//Clear cart
export const clearCart = async(req,res)=>{
    

    const userId =req.user;

    let cart = await Cart.findOne({userId});
    if(!cart){
        cart = new Cart({items:[]})
    } 
    else{

        cart.items =[];
    }

    
    await cart.save();

        res.json({message:'Cart Cleared!'});
       
}

//decrease Qty From cart

export const decreaseProductQty = async (req, res) => {
    const { productId, qty } = req.body;
  
    const userId = req.user;
  
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
      return res.json({ message: "Cart not found!" });
    }
  
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
  
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
  
      if (item.qty > qty) {
        const pricePerUnit = item.price / item.qty; // Calculate price per unit
        item.qty -= qty;
        item.price -= pricePerUnit * qty;
      } else {
        // Remove item if qty is less than or equal to decrement
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({ message: "Invalid Product Id!" });
    }
  
    await cart.save();
    res.json({ message: "Item Qty Decreased", cart });
  };
  