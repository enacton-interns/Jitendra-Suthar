import { useEffect } from "react";
import { IntroSection, AddJournal } from "../components";
import JournalSectionBackground from "/assets/images/journal-background.jpg";

const Journal = () => {
  useEffect(() => {
    document.title = "Journal | Mood Tracker";
  }, []);

  return (
    <>
      <IntroSection background={JournalSectionBackground} heading="Journal" />
      <AddJournal />
    </>
  );
};

export default Journal;
