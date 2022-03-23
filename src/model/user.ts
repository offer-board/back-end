import { Schema, model, connect, Types, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Status extends Types.Subdocument {
    date: string;
    code: string;
    note: string;
    color: string;
}
interface Position extends Types.Subdocument {
    title: string;
    type: string;
    status: Types.DocumentArray<Status>;
}
interface Job extends Types.Subdocument {
    company: string;
    positions: Types.DocumentArray<Position>;
}
interface User {
    name: string;
    email: string;
    avatar?: string;
    jobs: Types.DocumentArray<Job>;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    jobs: [new Schema<Job>({
        company: String,
        positions: [new Schema<Position>({
            title: String,
            type: String,
            status: [new Schema<Status>({
                date: Date,
                code: String,
                note: String
            })]
        })]
    })]
});

// 3. Create a Model.
const UserModel = model<User>('User', schema);

export default  UserModel;