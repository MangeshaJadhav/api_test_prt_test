const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();//here we function call the atlas connection
const app = express();

const port = process.env.PORT || 5000;

//middileware
app.use(express.json());//this is middelware is used for parse the data from json to string format
app.use("/v1/events", require("./routes/eventRoutes"));//in require we define the path
//this is routes for api contact

app.use(errorHandler);//from errorHandler file

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
