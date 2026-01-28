import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * Booking document interface for TypeScript type safety
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Email validation regex pattern
 * Validates standard email format: local@domain.tld
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Index for faster event-based queries
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // Normalize email to lowercase
      validate: {
        validator: (email: string) => EMAIL_REGEX.test(email),
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

/**
 * Pre-save hook validates that the referenced event exists
 * Prevents orphaned bookings by ensuring event integrity
 */
BookingSchema.pre("save", async function (next) {
  // Only validate eventId on new bookings or when eventId changes
  if (this.isModified("eventId") || this.isNew) {
    // Dynamic import to avoid circular dependency issues
    const Event = mongoose.models.Event;

    if (!Event) {
      throw new Error("Event model not initialized");
    }

    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }

  next();
});

// Compound index for preventing duplicate bookings (same email for same event)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Prevent model recompilation in development (Next.js hot reload)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
