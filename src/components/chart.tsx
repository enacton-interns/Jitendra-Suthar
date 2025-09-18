// MoodBarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MoodBarChart: React.FC = ({ moodRecords }: any) => {
  // Count mood occurrences base the mood type frequence
  const countMoods = (data: typeof moodRecords) => {
    // Storing count in object form like happy: 2
    const counts: Record<string, number> = {};
    data.forEach((item: any) => {
      counts[item.moodType] = (counts[item.moodType] || 0) + 1;
    });
    return counts;
  };

  const moodCounts = countMoods(moodRecords);
  // extracting only keys from the count object
  const labels = Object.keys(moodCounts);
  // extracting only values from the count object
  const data = Object.values(moodCounts);

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Mood Frequency",
        data: data,
        backgroundColor: ["#4bc0c0", "#ffcd56", "#ff6384", "#A19EFF"], // Chart colors
        borderRadius: 10,
      },
    ],
  };
  return (
    <div className="bg-white shadow-md rounded-md h-100 w-full">
      <Bar data={chartData} />
    </div>
  );
};

export default MoodBarChart;
