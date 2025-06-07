import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
}, { timestamps: true }); //createdAt, updatedAt

const User = mongoose.model("User", userSchema); 
//in above line, it must be model (models and Model will be wrong). secondly it must be User with capital U and singular. mongoDB will automatically create a collection named users.

export default User;
