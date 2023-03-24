const express = require("express");
const router = express.Router();

//here we import the function of res/req from contactCOntroller
const {
  getEvents,
  createEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getEvents).post(createEvents);

router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);


module.exports = router;
