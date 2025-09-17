import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableTags: string[] = [
  "gratitude",
  "work",
  "dreams",
  "self-care",
  "travel",
  "ideas",
];

const journalForm: React.FC<ModalProps> = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  // from data state
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev: any) =>
      prev.includes(tag) ? prev.filter((t: any) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // storing current date and time
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    const DateFormat: any = {
      weekday: "long", // Full weekday name (e.g., "Monday")
      month: "short", // Abbreviated month name (e.g., "Sep")
      day: "numeric", // Day of the month (e.g., "15")
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", DateFormat).format(
      date
    );
    // Generate unique ID
    const uniqueId = `mood_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const formData = {
      id: uniqueId,
      title,
      message,
      tags: selectedTags,
      createdAt: formattedDate,
      time: currentTime,
    };

    const existingJournal = JSON.parse(
      localStorage.getItem("allJournal") || "[]"
    );
    const updatedMoodEntries = [...existingJournal, formData];
    localStorage.setItem("allJournal", JSON.stringify(updatedMoodEntries));
    window.location.reload();

    setTitle("");
    setMessage("");
    setSelectedTags([]);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-30 flex justify-center items-center z-3 overflow-hidden">
          <div className="w-full max-w-lg bg-white rounded-md shadow-md mx-3 sm:mx-0 px-3 py-5 sm:p-5 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-3 sm:mb-5">
              Let's create another journal entry <br /> capture your thoughts.
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm md:text-md font-medium text-gray-700 mb-1">
                  What's this journal about?
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title your entry"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-0 placeholder:text-sm md:placeholder:text-md"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  What’s on your mind today?
                </label>
                <textarea
                  id="message"
                  placeholder="Describe your day, an idea, or something you want to remember."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm resize-none outline-0 placeholder:text-sm md:placeholder:text-md"
                  required
                />
              </div>

              {/* Tags Field */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Tags
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="capitalize">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!title}
                  className={`w-full py-3 px-4 font-semibold rounded-md transition duration-200 ${
                    title
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}>
                  Save Journal
                </button>
              </div>
            </form>
          </div>

          <button
            className="absolute top-5 right-5 bg-white p-3 rounded z-2 cursor-pointer"
            onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default journalForm;
