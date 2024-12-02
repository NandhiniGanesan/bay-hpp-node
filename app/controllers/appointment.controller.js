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

  
// Retrieve all Tutorials from the database.
// appointment.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
//     Appointments.find(condition)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };

  
module.exports = appointment;
