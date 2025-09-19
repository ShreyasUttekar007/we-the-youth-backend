import { Schema, model } from 'mongoose';

const registrationSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  isStudent: { type: String, required: true },
  academicCategory: String,
  degree: String,
  yearOfStudy: String,
  isWorkingProfessional: { type: String, required: true },
  organisation: String,
  role: String,
  isSelfEmployed: Boolean,
  workDescription: String,
  howDidYouHear: { type: String, required: true },
  roleToTake: { type: String, required: true },
  skills: [String],
  hoursPerWeek: { type: String, required: true },
  changeToSee: { type: String, required: true },
  whyJoin: { type: String, required: true },
  optInWhatsApp: { type: String, required: true },
  isPoliticallyActive: { type: String, required: true },
  hasContestedElections: String,
  desireToContest: String,
  contestedElectionsDetails: String,
  agreeToTerms: { type: Boolean, required: true },
}, { timestamps: true });

const Registration = model('Registration', registrationSchema);

export default Registration;
