import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrganization {
    name: string;
}

export interface IOrganizationModel extends IOrganization, Document {}

const OrganizationSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IOrganizationModel>('Organization', OrganizationSchema);
