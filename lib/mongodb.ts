import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}
const MONGODB_URI: string = mongodbUri;

type MongooseConnection = typeof mongoose;

interface MongooseCache {
  conn: MongooseConnection | null;
  promise: Promise<MongooseConnection> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Reuse a cached connection across hot reloads in development.
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cached;

export async function connectToDatabase(): Promise<MongooseConnection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    // Create the connection promise once so concurrent calls share it.
    cached.promise = mongoose.connect(MONGODB_URI, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset on failure so the next call can retry connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
