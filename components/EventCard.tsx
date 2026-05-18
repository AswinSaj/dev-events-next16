"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface Props {
  title: string;
  image: string;
  slug?: string;
  location?: string;
  date?: string;
  time: string;
}
const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      onClick={() =>
        posthog.capture("event_card_clicked", { title, slug, location, date })
      }
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <p>{title}</p>
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="Location" width={16} height={16} />
        {location && <span>{location}</span>}
      </div>
      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="Date" width={16} height={16} />
          {date && <span>{date}</span>}
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="Time" width={16} height={16} />
          {time && <span>{time}</span>}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
