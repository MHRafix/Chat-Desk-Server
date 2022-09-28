import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
	_id?: Types.ObjectId;
	user_name: string;
	user_email: string;
	user_password: string;
	user_pic: string;
	user_role: boolean;
}

const userModel: Schema = new Schema(
	{
		user_name: { type: String, required: true },
		user_email: { type: String, required: true },
		user_password: { type: String, required: true },
		user_pic: {
			type: String,
			required: true,
		},
		user_role: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>('User', userModel);
