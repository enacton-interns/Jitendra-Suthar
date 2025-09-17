import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const moodOptions = ["😊 Happy", "😟 Anxious", "😢 Sad", "😌 Calm", "😠 Angry"];

// assigning a perticullar tag with in the current time range
const getTimeOfDayTag = (hour: number): string => {
  switch (true) {
    case hour >= 5 && hour < 12:
      return "Morning";
    case hour >= 12 && hour < 17:
      return "Afternoon";
    case hour >= 17 && hour < 21:
      return "Evening";
    case hour >= 21 || hour < 5:
      return "Night";
    default:
      return "Morning"; // Default
  }
};

const MoodTrackerForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [timeOfDay, setTimeOfDay] = useState("");
  const [moodType, setMoodType] = useState("");
  const [moodNotes, setMoodNotes] = useState("");

  // Set time of day automatically when component mounts or when modal opens
  useEffect(() => {
    if (isOpen) {
      const currentHour = new Date().getHours();
      const autoTimeOfDay = getTimeOfDayTag(currentHour);
      setTimeOfDay(autoTimeOfDay);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // storing current date and time
    const date = new Date();

    // time in 24 hours format
    const currentTime = date.toLocaleTimeString();

    const DateFormat: any = {
      weekday: "long", // Full weekday name (e.g., "Monday")
      month: "short", //  month name (e.g., "Sep")
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
      timeOfDay,
      moodType,
      moodNotes: moodNotes || "",
      createdAt: formattedDate,
      time: currentTime,
    };

    // Store in localStorage
    const existingMoodEntries = JSON.parse(
      localStorage.getItem("moodEntries") || "[]"
    );
    const updatedMoodEntries = [...existingMoodEntries, formData];
    localStorage.setItem("moodEntries", JSON.stringify(updatedMoodEntries));
    onClose();

    // Reset form
    setMoodType("");
    setMoodNotes("");

    // Close the modal after submission
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-30 flex justify-center items-center z-3 overflow-hidden">
          <div className="w-full max-w-lg bg-white rounded-md shadow-md mx-3 sm:mx-0 px-3 py-5 sm:p-5 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-3 sm:mb-5">
              How are you feeling today?
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Time Display */}
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Current Time:</span> {timeOfDay}{" "}
                  •{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Mood Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your mood
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {moodOptions.map((mood) => (
                    <label
                      key={mood}
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        moodType === mood
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <input
                        type="radio"
                        name="moodType"
                        value={mood}
                        checked={moodType === mood}
                        onChange={(e) => setMoodType(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <span className="text-2xl mb-1">
                        {mood.split(" ")[0]}
                      </span>
                      <span className="text-sm text-gray-600">
                        {mood.split(" ")[1]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mood Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add a note (optional)
                </label>
                <textarea
                  rows={3}
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm outline-0 placeholder:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  placeholder="What's on your mind?"></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!moodType}
                  className={`w-full py-3 px-4 font-semibold rounded-md transition duration-200 ${
                    moodType
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}>
                  Save Mood Entry
                </button>
              </div>
            </form>
          </div>

          <button
            className="absolute top-5 right-5 bg-white p-3 rounded-md shadow-md z-2 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={onClose}>
            <i className="fa-solid fa-xmark text-gray-600"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default MoodTrackerForm;
