import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
      const uri = process.env.MONGO_URI || 'mongodb+srv://avigail7790:YMz0RqigU646xX9d@cluster0.akpn1bn.mongodb.net/bullpgia?retryWrites=true&w=majority';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application if the connection fails
    }
};

export default connectToDatabase;
