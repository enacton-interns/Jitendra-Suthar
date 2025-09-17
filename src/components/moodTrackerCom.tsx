import { useState } from "react";
import { TrackerForm, RecordList, Calender, Chart } from "../components";

const moodTrackerForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <section className="py-5">
      <div className="container mx-auto px-3">
        {/* wrapper */}
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
            <RecordList />
            <Calender />
          </div>
          <div className="w-full lg:w-1/2">
            <Chart />
          </div>
        </div>
        <TrackerForm isOpen={isModalOpen} onClose={handleClose} />
      </div>
    </section>
  );
};

export default moodTrackerForm;
