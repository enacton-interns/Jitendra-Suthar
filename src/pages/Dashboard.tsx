import { useEffect } from "react";
import { QuoteGenerator, QuickOverView } from "../components";
const Dashboard = () => {
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
