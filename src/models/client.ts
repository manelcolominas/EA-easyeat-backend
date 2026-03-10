import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    organization: mongoose.Types.ObjectId | string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        organization: { type: Schema.Types.ObjectId, required: true, ref: 'Organization' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
