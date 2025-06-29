const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());  //enables the backend to see whatever is passed 


//Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// const orderRoutes = require("./routes/orderRoutes");


app.use("/auth", authRoutes);
app.use("/admin", productRoutes);     // for /admin/products
app.use("/admin", categoryRoutes);    // for /admin/categories

//another style
app.use("/", require("./routes/orderRoutes"));
app.use("/", require("./routes/productRoutes"));


//connect mongoose to your mongoDB_URL
const PORT = process.env.PORT || 5000

//connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("mongoDB connected...");
  app.listen(PORT, () => {
    console.log(`server started running on port ${PORT}`); 
  });
});


//make the app show that it has deployed and active
app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome To FreshMart Supermarket"})
});



