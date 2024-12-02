let appointment = {}
const db = require("../models");
const Appointments = db.appointments;

appointment.bookAppointment =async (req, res) => {
    let appointmentDetail = req.body
    // Validate request
    // if (!req.body.doctorId) {
    //   res.status(400).send({ message: "Content can not be empty!" });
    //   return;
    // }

    const existingAppointment = await Appointments.findOne({
        doctorId: req.body.doctorId,
        date: req.body.date,
        time: req.body.time
    });

    if (existingAppointment) {
        return res.status(400).send('Requested time slot is already booked');
    }


    // Create a appointment
    const appointment = new Appointments({
        ...req.body,
        status:"upcoming",
      
    });
  
    // Save appointment in the database
    appointment
      .save(appointment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

// Retrieve all Tutorials from the database.
appointment.findAll = (req, res) => {
    
    var condition =  {}
   if(req.query.status){
    condition.status =  req.query.status
   }
   if(req.query.date){
    condition.date =  req.query.date
   }
   if(req.query.doctorId){
    condition.doctorId = req.query.doctorId
   }

    Appointments.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  
// Update a Appointment by the id in the request
appointment.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Appointments.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found!`
        });
      } else res.send({ message: "Appointment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + id
      });
    });
};



// Delete a Appointment with the specified id in the request
appointment.delete = (req, res) => {
  const id = req.params.id;

  Appointments.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
        });
      } else {
        res.send({
          message: "Appointment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Appointment with id=" + id
      });
    });
};
  

  
module.exports = appointment;
