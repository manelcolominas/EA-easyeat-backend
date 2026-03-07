import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrganization {
    name: string;
    users: Types.ObjectId[];
}

export interface IOrganizationModel extends IOrganization, Document {}

const OrganizationSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IOrganizationModel>('Organization', OrganizationSchema);
