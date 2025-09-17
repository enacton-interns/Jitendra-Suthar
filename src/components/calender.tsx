import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";

// Get mood entries from localStorage
const moodData: any[] = JSON.parse(localStorage.getItem("moodEntries") || "[]");

// Group moods by date
const groupedMoods: Record<string, any[]> = {};
const currentYear = new Date().getFullYear();

moodData.forEach((entry) => {
  const parsedDate = dayjs(
    `${entry.createdAt} ${currentYear}`,
    "dddd, MMM D YYYY"
  );
  const key = parsedDate.format("YYYY-MM-DD");

  if (!groupedMoods[key]) {
    groupedMoods[key] = [];
  }

  groupedMoods[key].push(entry);
});

// Convert grouped data into calendar events
const events = Object.entries(groupedMoods).flatMap(([date, moods]) =>
  moods.map((mood) => ({
    title: mood.moodType, // we'll handle line break in renderEventContent
    timeOfDay: mood.timeOfDay,
    start: date,
    allDay: true,
  }))
);

// Custom event renderer to display two lines
const renderEventContent = (eventInfo: any) => {
  const { event } = eventInfo;
  const moodType = event.title;
  const timeOfDay = event.extendedProps.timeOfDay;

  return (
    <div className="flex flex-col leading-tight text-sm text-white  bg-[#6780FF]/20 ">
      <div>{moodType}</div>
      <div className="text-xs ml-2 py-0.5">{timeOfDay}</div>
    </div>
  );
};

// Main calendar component
const Celender = () => {
  const windowSize = window.screen.availWidth;

  return (
    <div className="h-auto w-full lg:w-1/2 object-contain text-sm sm:text-md">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={`${windowSize > 768 ? "500px" : "auto"}`}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default Celender;
