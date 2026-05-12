export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Conference 2023",
    slug: "event-1",
    location: "New York",
    date: "2023-10-15",
    time: "10:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "JavaScript Summit 2023",
    slug: "event-2",
    location: "San Francisco",
    date: "2023-10-20",
    time: "2:00 PM",
  },
  {
    image: "/images/event3.png",
    title: "TypeScript Conference 2023",
    slug: "event-3",
    location: "London",
    date: "2023-10-25",
    time: "11:00 AM",
  },
  {
    image: "/images/event4.png",
    title: "Node.js Summit 2023",
    slug: "event-4",
    location: "Tokyo",
    date: "2023-10-30",
    time: "9:00 AM",
  },
  {
    image: "/images/event5.png",
    title: "Vue.js Workshop 2023",
    slug: "event-5",
    location: "Berlin",
    date: "2023-11-05",
    time: "1:00 PM",
  },
  {
    image: "/images/event6.png",
    title: "GraphQL Summit 2023",
    slug: "event-6",
    location: "Toronto",
    date: "2023-11-10",
    time: "11:00 AM",
  },
  //   {
  //     image: "/images/event7.png",
  //     title: "DevOps Days 2023",
  //     slug: "event-7",
  //     location: "Sydney",
  //     date: "2023-11-15",
  //     time: "9:30 AM",
  //   },
  //   {
  //     image: "/images/event8.png",
  //     title: "AI & ML Conference 2023",
  //     slug: "event-8",
  //     location: "Bangalore",
  //     date: "2023-11-20",
  //     time: "10:00 AM",
  //   },
  //   {
  //     image: "/images/event9.png",
  //     title: "Frontend Masters 2023",
  //     slug: "event-9",
  //     location: "Paris",
  //     date: "2023-11-25",
  //     time: "2:00 PM",
  //   },
  //   {
  //     image: "/images/event10.png",
  //     title: "Full Stack Fest 2023",
  //     slug: "event-10",
  //     location: "São Paulo",
  //     date: "2023-11-30",
  //     time: "12:00 PM",
  //   },
];
