import mongoose, { model, models } from "mongoose";
import bcrypt from "bcryptjs";


export type UserType = {
    _id?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const userSchema = new mongoose.Schema<UserType>({
    email: { type: String, trim: true, required: true, lowercase: true, unique: true },
    password: { type: String, trim: true, required: true, },
    firstName: { type: String, trim: true, required: true, },
    lastName: { type: String, trim: true, required: true, },
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }

    next();
});



const UserModel =  models.users || model("User", userSchema);
export default UserModel<UserType>