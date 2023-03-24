//this is logic for req and res of router and will connect with database
//here we do function that return the route requirement

const asyncHandler = require("express-async-handler");//this is package
//this for handle async promises function//to avoid package of try and catch block
const Contact = require("../models/evnetModel");

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user_id: req.user.id });
  res.status(200).json(events);
});//this will give all contacts


const createEvents = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body); //req from frontend
  //here we print the req coming from fe

  const { title, description, location } = req.body; //destructring
  //here now for error handling:-to send this data we req convert into json format not in html so use here middiware
  if (!title || !description || !location) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const event = await Event.create({
    title,
    description,
    location,
    user_id: req.user.id,
  });

  res.status(201).json(event);
});


const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);//req method for to get pass the id by for method
  
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json(event);//return the conatct syntax
});


const updateEvent = asyncHandler(async (req, res) => {
  //first fetch req contact
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other event");
  }
//---------------------------------------
//inside in that pass the id which we have updates
//new body that we have updates
  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }//query options
  );
//above syntax for prepartion of update and below this one for res to send
  res.status(200).json(updatedEvent);//after that we the new updates contact
});


const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  if (event.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user event");
  }
  //to delete
  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json(event);
});

//this function return value is export to contactRoutes file
module.exports = {
  getEvents,
  createEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};

//mongodb://Mangesh:<password>@ac-tilkzhv-shard-00-00.iwytkrl.mongodb.net:27017,ac-tilkzhv-shard-00-01.iwytkrl.mongodb.net:27017,ac-tilkzhv-shard-00-02.iwytkrl.mongodb.net:27017/?ssl=true&replicaSet=atlas-ccg96b-shard-0&authSource=admin&retryWrites=true&w=majority
