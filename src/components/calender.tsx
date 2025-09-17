import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";

// Main calendar component
const Celender = ({ moodRecords }: any) => {
  const windowSize = window.screen.availWidth;

  // Group moods by date
  const groupedMoods: Record<string, any[]> = {};
  const currentYear = new Date().getFullYear();

  moodRecords.forEach((entry: any) => {
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
      title: mood.moodType,
      timeOfDay: mood.timeOfDay,
      start: date,
      allDay: true,
    }))
  );

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

// Custom event renderer to display two lines
const renderEventContent = (eventInfo: any) => {
  const { event } = eventInfo;
  const moodType = event.title;
  const timeOfDay = event.extendedProps.timeOfDay;

  return (
    <div className="flex flex-row items-center leading-tight text-sm text-white bg-[#6780FF]/20 w-10">
      <p className="w-fit">{moodType.slice(0, 2)}</p>
      <div className="text-xs ml-2 py-0.5">{timeOfDay}</div>
    </div>
  );
};

export default Celender;
