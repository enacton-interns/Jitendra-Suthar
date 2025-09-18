import { useEffect } from "react";
import { QuoteGenerator, QuickOverView } from "../components";
const Dashboard = () => {
  // updating page title when user navigate
  useEffect(() => {
    document.title = "Dashboard | Mood Tracker";
  }, []);

  return (
    <>
      <QuoteGenerator />
      <QuickOverView />
    </>
  );
};

export default Dashboard;
