import { HydratedDocument, Model, Schema, Types, model, models } from "mongoose";

import { Event } from "./event.model";

interface BookingAttributes {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BookingDocument = HydratedDocument<BookingAttributes>;
type BookingModel = Model<BookingAttributes>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<BookingAttributes>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_PATTERN.test(value),
        message: "Invalid email format.",
      },
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ eventId: 1 });

BookingSchema.pre("save", async function (this: BookingDocument) {
  // Normalize and validate email before persisting.
  this.email = this.email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(this.email)) {
    throw new Error("Invalid email format.");
  }

  // Ensure the referenced event exists before creating/updating bookings.
  if (this.isNew || this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error("Referenced event does not exist.");
    }
  }
});

const Booking =
  (models.Booking as BookingModel) ||
  model<BookingAttributes>("Booking", BookingSchema);

export { Booking };
export type { BookingAttributes, BookingDocument };
