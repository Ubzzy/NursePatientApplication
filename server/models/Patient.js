var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema(
  {
    patientId: {type: String,required: true},
  bodyTemperature: String,
  heartRate: String,
  bloodPressure: String,
  respiratoryRate: String,
  },
  {
    collection: "patients",
}
);

module.exports = mongoose.model('patients', PatientSchema);