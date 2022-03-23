import mongoose from 'mongoose';
import 'dotenv/config'

export default async function Mongoose() {
    const mongoURI = process.env.MONGOURI;
    mongoose.connect(mongoURI, {
        keepAlive: true,
    });
    mongoose.connection.on('connected', () => {
        console.log(`✅ [MongoDB]: ${mongoose.connection.name} is connected!`);
    });
    mongoose.connection.on('error', (error) => {
        console.error(`❌ [MongoDB]: connection errored! ${error}`);
    });
}