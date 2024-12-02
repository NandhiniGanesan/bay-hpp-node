module.exports = app => {
    const appointment = require("../controllers/appointment.controller.js");
  
    let authenticationValidation= (req,res,next)=>{
      // TODO
      // logic to check if condition  req.user.role // will handle
      
      res.status(401).send({
        message:
          err.message || "Authenticatioon error"
      });
        next()
    }

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", appointment.bookAppointment);

    // Retrieve all Tutorials
    router.get("/", appointment.findAll);


      // Retrieve a single Doctors with id
  router.get("/:id",authenticationValidation, (req,res)=>{res.send(200).message("Authenticatioon error")});
  // Update a Doctors with id
  router.put("/:id", appointment.update);

  // Delete a Doctors with id
  router.delete("/:id", appointment.delete);

    app.use("/appointments", router);
  };
  