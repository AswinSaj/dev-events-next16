import { HydratedDocument, Model, Schema, model, models } from "mongoose";

interface EventAttributes {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type EventDocument = HydratedDocument<EventAttributes>;
type EventModel = Model<EventAttributes>;

const REQUIRED_STRING_FIELDS: Array<
  keyof Pick<
    EventAttributes,
    | "title"
    | "description"
    | "overview"
    | "image"
    | "venue"
    | "location"
    | "date"
    | "time"
    | "mode"
    | "audience"
    | "organizer"
  >
> = [
  "title",
  "description",
  "overview",
  "image",
  "venue",
  "location",
  "date",
  "time",
  "mode",
  "audience",
  "organizer",
];

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDateToIso(dateValue: string): string {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format. Please provide a valid date.");
  }
  return parsedDate.toISOString();
}

function normalizeTime(timeValue: string): string {
  const value = timeValue.trim();
  const twentyFourHourPattern = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  const twelveHourPattern = /^(1[0-2]|0?[1-9]):([0-5]\d)\s*([aApP][mM])$/;

  const twentyFourHourMatch = twentyFourHourPattern.exec(value);
  if (twentyFourHourMatch) {
    const hours = twentyFourHourMatch[1].padStart(2, "0");
    const minutes = twentyFourHourMatch[2];
    return `${hours}:${minutes}`;
  }

  const twelveHourMatch = twelveHourPattern.exec(value);
  if (!twelveHourMatch) {
    throw new Error("Invalid time format. Use HH:mm or h:mm AM/PM.");
  }

  const rawHours = Number(twelveHourMatch[1]);
  const minutes = twelveHourMatch[2];
  const meridiem = twelveHourMatch[3].toUpperCase();
  const normalizedHours = (rawHours % 12) + (meridiem === "PM" ? 12 : 0);

  return `${String(normalizedHours).padStart(2, "0")}:${minutes}`;
}

function normalizeStringArray(values: string[], fieldName: string): string[] {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`${fieldName} must contain at least one value.`);
  }

  const normalized = values.map((value) => value.trim());
  if (normalized.some((value) => value.length === 0)) {
    throw new Error(`${fieldName} cannot contain empty values.`);
  }

  return normalized;
}

const EventSchema = new Schema<EventAttributes>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ slug: 1 }, { unique: true });

EventSchema.pre("save", function (this: EventDocument) {
  // Ensure all required text fields are present and normalized.
  for (const fieldName of REQUIRED_STRING_FIELDS) {
    const value = this[fieldName];
    if (value.trim().length === 0) {
      throw new Error(`${fieldName} is required and cannot be empty.`);
    }
    this[fieldName] = value.trim();
  }

  this.agenda = normalizeStringArray(this.agenda, "agenda");
  this.tags = normalizeStringArray(this.tags, "tags");

  // Regenerate slug only when title changes (or slug is missing).
  if (this.isModified("title") || !this.slug) {
    this.slug = slugifyTitle(this.title);
    if (this.slug.length === 0) {
      throw new Error("Unable to generate a valid slug from title.");
    }
  }

  // Persist date/time in predictable formats for consistent reads.
  this.date = normalizeDateToIso(this.date);
  this.time = normalizeTime(this.time);
});

const Event = (models.Event as EventModel) || model<EventAttributes>("Event", EventSchema);

export { Event };
export type { EventAttributes, EventDocument };
