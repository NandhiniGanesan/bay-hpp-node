module.exports = app => {
    const appointment = require("../controllers/appointment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", appointment.bookAppointment);

    // Retrieve all Tutorials
    router.get("/", appointment.findAll);

    app.use("/appointments", router);
  };
  