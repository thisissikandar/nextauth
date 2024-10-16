import mongoose,{Document} from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please provide username"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Please Provide Email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please Provide Password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
