import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing DB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🌱 New DB connection");
    cached.promise = mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
