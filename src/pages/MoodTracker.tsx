import { useEffect } from "react";
import { IntroSection, MoodTrackerGrid } from "../components";
import MoodTrackerSectionBackground from "/assets/images/moodTracker-background-image.jpg";

const Mood_Tracker = () => {
  // updating page title when user navigate
  useEffect(() => {
    document.title = "Track Report | Mood Tracker";
  }, []);

  return (
    <>
      <IntroSection
        background={MoodTrackerSectionBackground}
        heading="Track Your Mood"
      />
      <MoodTrackerGrid />
    </>
  );
};

export default Mood_Tracker;
