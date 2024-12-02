module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            patientId: {
                type: String,
                required: [true, 'Patient Id is required'], 
            },
            patientName: {
                type: String,
                required: [true, 'Patient Name is required'], 
            },
            doctorName: {
                type: String,
                required: true,
            },
            doctorId: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            },
            note: {
                type: String,
                required: false,
            },
            status:{
                type: String,
                required: false, 
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Appointments = mongoose.model("appointments", schema);
    return Appointments;
};
