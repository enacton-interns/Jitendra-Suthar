import { Routes, Route } from "react-router";
import { Dashboard, Journal, MoodTracker } from "./pages";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
