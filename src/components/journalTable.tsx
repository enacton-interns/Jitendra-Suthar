const journalTable = ({ journals, limit, deleteButton }: any) => {
  // counting fetched documents
  let count = 0;

  // todays date
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // deleting a journal base on i'd
  const handleDelete = (id: any) => {
    const newJournal = journals.filter((item: any) => item.id !== id);
    localStorage.setItem("allJournal", JSON.stringify(newJournal));
    window.location.reload();
  };

  // limited documents display
  const renderJournals =
    limit > 0
      ? journals
          .slice(0, limit)
          .filter((item: any) => item.createdAt.includes(todayString))
      : journals;

  return (
    <>
      {renderJournals.length > 0 ? (
        renderJournals.map((item: any, index: number) => {
          count = count + 1;
          return (
            <div
              className="flex flex-col space-x-4 pt-3 border-b border-gray-100"
              key={index}>
              {/* top id-title-date */}
              <div className="flex gap-2 items-center sm:flex-nowrap m-0 mb-3">
                <span className="font-bold">{count}.</span>
                <div className="flex justify-between items-center w-full">
                  <p className="capitalize text-md font-semibold ">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">{item.createdAt}</p>
                </div>
                {deleteButton && (
                  <button
                    className="cursor-pointer hover:bg-red-50 p-2 rounded-md"
                    onClick={() => handleDelete(item.id)}>
                    <i className="fa-solid fa-trash text-red-400"></i>
                  </button>
                )}
              </div>

              {/* middle message */}
              <p className="text-sm md:text-md text-gray-700 mb-3 mr-0 text-justify">
                {item.message}
              </p>

              {/* bottom tags */}
              {item.tags.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {item.tags.map((tag: string, index: number) => {
                    return (
                      <p
                        key={index}
                        className="text-sm h-7 md:text-md bg-[#6780FF]/10 border-1 border-[#6780FF]/20 w-fit px-4 rounded-2xl flex justify-center items-center text-[#6780FF]">
                        {tag}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        // when journal is emepty
        <p className="text-sm sm:text-md text-gray-400">
          Every journey begins with a single entry. Start your journal today!
        </p>
      )}
    </>
  );
};

export default journalTable;
