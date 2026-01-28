import mongoose, { Connection } from "mongoose";

/**
 * MongoDB connection configuration for Next.js
 *
 * In development, Next.js clears the Node.js cache on every request,
 * which would create multiple database connections. We cache the connection
 * in the global object to prevent this issue.
 */

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Type definition for the cached connection object
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the NodeJS global type to include our mongoose cache
 * This allows TypeScript to recognize the global.mongoose property
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * Initialize the cached connection object
 * Use existing global cache or create a new one
 */
const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

// Persist the cache in the global object for development hot reloading
global.mongoose = cached;

/**
 * Establishes a connection to MongoDB using Mongoose
 *
 * Features:
 * - Reuses existing connections when available
 * - Caches the connection promise to prevent race conditions
 * - Handles connection errors gracefully
 *
 * @returns Promise resolving to the Mongoose connection
 */
async function connectToDatabase(): Promise<Connection> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the connection and cache the result
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;
  } catch (error) {
    // Reset the promise on error to allow retry attempts
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
