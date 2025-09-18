import { useEffect, useState } from "react";
import { JournalList } from "../components";

const overview = () => {
  const [moodRecords, setMoodRecords] = useState([]);
  const [journalData, setJournalData] = useState([]);

  // load data from local storage
  const loadData = () => {
    const moodData: any = JSON.parse(
      localStorage.getItem("moodEntries") || "[]"
    );
    const dailyJurnal = JSON.parse(localStorage.getItem("allJournal") || "[]");
    setJournalData(dailyJurnal);
    setMoodRecords(moodData);
  };

  console.log(moodRecords);

  // load data on every mount
  useEffect(() => {
    loadData();
  }, []);

  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="py-5">
      <div className="container mx-auto px-3">
        {/* Mood Record + List of Journal Overview wrapper */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* moods records data */}
          <div className="bg-white rounded-md shadow-lg p-5 border-1 border-gray-200 md:w-[500px]">
            <h3 className="text-md md:text-lg lg:text-xl font-semibold text-gray-800 mb-4">
              Moods Record
            </h3>
            {/* check the mood record array length */}
            {moodRecords.length > 0 ? (
              // filter all record for today only
              moodRecords.filter(
                (item: any) => item.createdAt.includes(todayString)
                // check the length of filtered records
              ).length > 0 ? (
                moodRecords.map((item: any) => (
                  <div
                    className="flex flex-col space-y-2 py-2 border-b border-gray-100"
                    key={item.id}>
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-700 mb-2">
                        {item.moodType}
                      </p>
                      <span className="text-sm h-7 md:text-md bg-[#6780FF]/10 border-1 border-[#6780FF]/20 w-fit px-4 rounded-2xl flex justify-center items-center text-[#6780FF]">
                        {item.timeOfDay}
                      </span>
                    </div>
                    <div className="font-light flex justify-between gap-2 text-sm text-gray-400 mb-2">
                      <time dateTime={item.time}>{item.time}</time>
                      <time dateTime={item.createdAt}>{item.createdAt}</time>
                    </div>
                  </div>
                ))
              ) : (
                // display if today filtered record length it 0
                <p className="text-sm sm:text-md text-gray-400">
                  No mood records for today.
                </p>
              )
            ) : (
              // display if mood record length is 0 without appling filter
              <p className="text-sm sm:text-md text-gray-400">
                Your mood list is empty. Add your first entry now!
              </p>
            )}
          </div>

          {/* daily journal data */}
          <div className="relative w-full bg-white rounded-md shadow-lg p-5 border-1 border-gray-200 ">
            <h3 className="text-md md:text-lg lg:text-xl font-semibold text-gray-800 mb-4">
              latest Journal
            </h3>

            <JournalList journals={journalData} limit={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default overview;
