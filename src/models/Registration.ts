import { Schema, model } from "mongoose";

const registrationSchema = new Schema(
  {
    name: String,
    age: Number,
    gender: String,
    email: String,
    mobileNumber: String,
    state: String,
    district: String,
    isStudent: String,
    academicCategory: String,
    degree: String,
    yearOfStudy: String,
    isWorkingProfessional: String,
    organisation: String,
    role: String,
    isSelfEmployed: Boolean,
    workDescription: String,
    howDidYouHear: String,
    roleToTake: String,
    skills: [String],
    hoursPerWeek: String,
    changeToSee: String,
    whyJoin: String,
    optInWhatsApp: String,
    isPoliticallyActive: String,
    hasContestedElections: String,
    desireToContest: String,
    contestedElectionsDetails: String,
    agreeToTerms: Boolean,
  },
  { timestamps: true }
);

const Registration = model("Registration", registrationSchema);

export default Registration;
