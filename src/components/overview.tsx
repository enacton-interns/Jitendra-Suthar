import { JournalList } from "../components";

const overview = () => {
  const moodData: any = JSON.parse(localStorage.getItem("moodEntries") || "[]");

  const dailyJurnal = JSON.parse(localStorage.getItem("allJournal") || "[]");

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
              {today.toLocaleDateString("en-US", {
                weekday: "long",
              })}{" "}
              Moods Record
            </h3>
            {/* check the mood record array length */}
            {moodData.length > 0 ? (
              // filter all record for today only
              moodData.filter(
                (item: any) => item.createdAt.includes(todayString)
                // again check the length of filtered records
              ).length > 0 ? (
                moodData.map((item: any) => (
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
                    <p className="text-sm text-gray-400 text-justify mb-2">
                      {item.moodNotes}
                    </p>
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
              Your latest Journal
            </h3>

            <JournalList journals={dailyJurnal} limit={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default overview;
