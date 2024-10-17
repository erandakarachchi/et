import mongoose from "mongoose";

const MONGO_DB_URL =
  "mongodb+srv://admin:superprodadmin@demo.nrxu7.mongodb.net/?retryWrites=true&w=majority&appName=demo";
let cachedConnection: any = null;

// Would return cached connection if it exists
async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }
  cachedConnection = await mongoose.connect(MONGO_DB_URL, {
    serverSelectionTimeoutMS: 5000,
  });
}

export default connectToDatabase;
