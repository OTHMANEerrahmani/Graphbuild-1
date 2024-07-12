import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
  },
  planId: {
    type: String,
    required: true,
  },
  planType: {
    type: String,
    enum: ["basic", "pro"],
    required: true,
  },
  planStartDate: {
    type: Date,
    required: true,
  },
  planEndDate: {
    type: Date,
    required: true,
  },
  planDuration: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      // default: null,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      min: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    picturePath: {
      type: String,
      default: null,
    },
    subscription: SubscriptionSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
