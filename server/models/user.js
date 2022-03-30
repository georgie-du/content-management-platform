import mongoose from "mongoose";

//define user schema
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
  }
);

// compile model from schema

export default mongoose.model("User", userSchema);


