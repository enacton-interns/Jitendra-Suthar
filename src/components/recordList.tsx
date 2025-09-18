import { useState } from "react";

const recordList = ({ moodRecords, handleDelete }: any) => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleExpandClick = (id: any) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <div className="lg:h-[500px] w-full lg:w-1/2 px-2 py-4 md:p-5 space-y-2.5 rounded-md bg-white shadow-md overflow-auto scroll-smooth">
      {moodRecords.length > 0 ? (
        moodRecords.map((item: any) => {
          // check and storing the state like id is match or not
          const isExpanded = expandedItemId === item.id;
          return (
            <div
              className="flex items-left md:item-center flex-col md:flex-row gap-x-4 py-3 px-2 border-1 rounded-md border-gray-200"
              key={item.id}>
              <div className="flex flex-col flex-1 mr-0 justify-center">
                <p
                  className={`font-medium text-gray-700 ${
                    item.moodNotes && "mb-1"
                  }`}>
                  {item.moodType}
                </p>
                {item.moodNotes && (
                  <p
                    className={`text-sm text-gray-400 text-justify mb-1 ${
                      item.moodNotes.length > 50 && "cursor-pointer"
                    }`}
                    onClick={() => handleExpandClick(item.id)}>
                    {isExpanded
                      ? item.moodNotes
                      : item.moodNotes.length > 50
                      ? item.moodNotes.slice(0, 100) + "..."
                      : item.moodNotes}
                  </p>
                )}
              </div>
              <div className="flex justify-between w-full md:w-auto md:justify-center items-center gap-2">
                <span className="text-sm h-7 md:text-md bg-[#6780FF]/10 border-1 border-[#6780FF]/20 w-fit px-4 rounded-2xl flex justify-center items-center text-[#6780FF]">
                  {item.timeOfDay}
                </span>
                <button
                  className="cursor-pointer hover:bg-red-50 p-2 rounded-md"
                  onClick={() => handleDelete(item.id)}>
                  <i className="fa-solid fa-trash text-red-400"></i>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm sm:text-md text-gray-400">
          Your mood list is empty. Add your first entry now!
        </p>
      )}
    </div>
  );
};

export default recordList;
