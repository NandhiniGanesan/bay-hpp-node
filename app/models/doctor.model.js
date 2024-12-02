module.exports = mongoose => {

  var schema = mongoose.Schema(
    {
      name: {
        type: String,
         required: [true, 'Doctor name is required'], 
        minlength: [3, 'Doctor name must be at least 3 characters long'],
        maxlength: [50, 'Doctor name must be less than 50 characters'],
    },
    specialization: {
      type: String,
      required: false,
  },
  availablity: {
    type: Boolean,
    required: false,
}
    },
    { timestamps: true}
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Doctor = mongoose.model("doctors", schema);
  return Doctor;
};
