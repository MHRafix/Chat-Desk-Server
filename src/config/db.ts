import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://Rafiz:HYBpMP9n5pZXukIO@cluster0.ihrci.mongodb.net/CHAT_DESK?retryWrites=true&w=majority'
		);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error: any) {
		console.log(`Error: ${error.message}`);
		process.exit();
	}
};
