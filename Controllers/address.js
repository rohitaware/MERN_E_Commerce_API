import { Address } from "../Models/Address.js";



export const addAddress = async (req, res) => {
    try {
        const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
        const userId = req.user; // Ensure `req.user` is populated correctly.

        const userAddress = await Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber,
        });

        res.json({ message: "Address Added", userAddress,success:true });
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error });
    }
};

export const getAddress = async (req,res)=>{
    let address = await Address.find({userId:req.user}).sort({createdAt:-1});
    res.json({message:"Address", userAddress:address[0]})

}