import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Event document interface for TypeScript type safety
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generates a URL-friendly slug from a title
 * Converts to lowercase, replaces spaces/special chars with hyphens
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Normalizes date string to ISO format (YYYY-MM-DD)
 * Throws error if date is invalid
 */
function normalizeDate(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return parsed.toISOString().split("T")[0];
}

/**
 * Normalizes time to 24-hour format (HH:MM)
 * Accepts various formats: "14:30", "2:30 PM", etc.
 */
function normalizeTime(timeStr: string): string {
  const trimmed = timeStr.trim();

  // Already in HH:MM format
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
    const [hours, minutes] = trimmed.split(":").map(Number);
    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }
  }

  // Handle 12-hour format with AM/PM
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }
  }

  throw new Error(`Invalid time format: ${timeStr}`);
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be online, offline, or hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "Agenda must have at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one tag is required",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

/**
 * Pre-save hook handles:
 * 1. Slug generation (only when title changes or new document)
 * 2. Date normalization to ISO format
 * 3. Time normalization to 24-hour format
 */
EventSchema.pre("save", async function (next) {
  // Generate slug only if title is new or modified
  if (this.isModified("title") || this.isNew) {
    let baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness by appending counter if needed
    const EventModel = this.constructor as Model<IEvent>;
    while (await EventModel.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified("date")) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time to 24-hour format (HH:MM)
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }

  next();
});

// Prevent model recompilation in development (Next.js hot reload)
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
