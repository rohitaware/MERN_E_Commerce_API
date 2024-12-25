import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import cors from "cors";


const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//Home testing routes
app.get("/", (req, res) => res.json({ message: "This is home Route" }));

//User Router
app.use("/api/user", userRouter);

//Product Router
app.use("/api/product", productRouter);

//cart Router
app.use("/api/cart", cartRouter);

//address router
app.use("/api/address", addressRouter);

//payment router
app.use("/api/payment", paymentRouter);

mongoose
  .connect(
    "mongodb+srv://rohitaware99:JcDofgAxfFbIRlhv@cluster0.zo1km.mongodb.net/",
    {
      dbName: "MERN_E_Commerce",
    }
  )
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((err) => console.log(err));

const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
