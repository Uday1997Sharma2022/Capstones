const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({limit : "10mb"}));

const PORT = process.env.PORT || 8080

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

  //schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });

  //
  const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req,res)=>{
    res.send("server is running")
})
//Signup..............................................
app.post("/Signup",(req,res)=>{
    console.log(req.body)
    const {email} = req.body;
    const data = userModel(req.body);
    const save = data.save();
    res.send({ message: "Successfully sign up", alert: true });
    });

//api login................................
app.post("/login", async(req, res)=>{
  console.log(req.body)
  const{email} = req.body
  const dataSend = await userModel.findOne({ email: email })
  console.log(dataSend);
  res.send({
    message: "Login is successfully",
    alert: true,
    data: dataSend,
  });
});


  

//product section..................................................................

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Upload successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

//SERVER.....................................................................
app.listen(PORT, () => console.log("server is running at port : " + PORT)); 









