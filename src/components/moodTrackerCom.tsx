import { useEffect, useState } from "react";
import { TrackerForm, RecordList, Calender, Chart } from "../components";

const MoodTrackerForm = () => {
  // useState for storing all loaded Data.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moodData, setMoodData] = useState<any>([]);

  // Function to load data from local storage
  const loadMoodData = () => {
    const moodRecords = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    setMoodData(moodRecords);
  };

  // Load data on every mount
  useEffect(() => {
    loadMoodData();
  }, []);

  // Open the Form
  const handleOpen = () => setIsModalOpen(true);

  // Close the modal and refresh data
  const handleCloseAndRefresh = () => {
    setIsModalOpen(false);
    loadMoodData();
  };

  // Delete Saved Records
  const handleDelete = (id: string) => {
    const updatedMoodData = moodData.filter((item: any) => item.id !== id);
    localStorage.setItem("moodEntries", JSON.stringify(updatedMoodData));
    setMoodData(updatedMoodData); // Update state to trigger re-render
  };

  return (
    <section className="py-5">
      <div className="container mx-auto px-3">
        <div className="space-y-5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="sm:text-md md:text-xl font-semibold text-gray-800">
              Your Previous records
            </h3>
            <button
              className="sm:text-md flex justify-center items-center border-2 p-2 sm:px-3 sm:py-1 rounded cursor-pointer bg-[#6780FF]/10 border-[#6780FF]/20 text-[#6780FF] hover:bg-[#6780FF]/15"
              onClick={handleOpen}>
              <i className="fa-solid fa-plus sm:mr-2"></i>
              <span className="hidden sm:block">Add Today's Mood</span>
            </button>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row justify-between w-full">
            <RecordList moodRecords={moodData} handleDelete={handleDelete} />
            <Calender moodRecords={moodData} />
          </div>
          <div className="w-full lg:w-1/2">
            <Chart moodRecords={moodData} />
          </div>
        </div>
        {/* Pass the new close handler to the modal */}
        <TrackerForm isOpen={isModalOpen} onClose={handleCloseAndRefresh} />
      </div>
    </section>
  );
};

export default MoodTrackerForm;
