import { JournalList } from "../components";
import { useEffect, useState } from "react";
import JournalForm from "./journalForm";

const NewJournalEntry = () => {
  // Handling model open and close state (true or false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useState for storing Journal Data
  const [journalData, setJournalData] = useState([]);

  // load data from local storage
  const JournalRecords = () => {
    const dailyJurnal = JSON.parse(localStorage.getItem("allJournal") || "[]");
    setJournalData(dailyJurnal);
  };

  // load data on every mount
  useEffect(() => {
    JournalRecords();
  }, []);

  // open model form
  const handleOpen = () => setIsModalOpen(true);

  // closing model and refresh data
  const handleClose = () => {
    setIsModalOpen(false);
    JournalRecords();
  };

  // deleting a journal base on i'd
  const handleDelete = (id: any) => {
    const newJournal = journalData.filter((item: any) => item.id !== id);
    localStorage.setItem("allJournal", JSON.stringify(newJournal));
    JournalRecords(); // re-call to load the update data from localstorage
  };

  return (
    <section className="py-5 relative">
      <div className="container px-3 mx-auto">
        <div>
          {/* heading + button group */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="sm:text-md md:text-xl font-semibold text-gray-800">
              List of All Journal
            </h3>
            <button
              className="sm:text-md flex justify-center items-center border-2 p-2 sm:px-3 sm:py-1 rounded cursor-pointer bg-[#6780FF]/10 border-[#6780FF]/20 text-[#6780FF] hover:bg-[#6780FF]/15"
              onClick={handleOpen}>
              <i className="fa-solid fa-plus sm:mr-2"></i>
              <span className="hidden sm:block">Add New Journal</span>
            </button>
          </div>

          {/* List of All Journal */}
          <div className="w-full bg-white rounded-md shadow-lg p-5 border-1 border-gray-200">
            <JournalList
              journals={journalData}
              deleteButton={true}
              deleteFunction={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Conditionally Render JournalForm */}
      <JournalForm isOpen={isModalOpen} onClose={handleClose} />
    </section>
  );
};

export default NewJournalEntry;
