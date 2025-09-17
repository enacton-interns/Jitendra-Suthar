import { useEffect, useState } from "react";
import HeroSectionBackground from "/assets/images/dashboard-background-image.jpg";

// API response type declaration | interface
interface dailyQuote {
  author: string;
  authorSlug: string;
  content: string;
  length: number;
}

const quote = () => {
  const [quote, setQuote] = useState<dailyQuote>();
  const [loading, setLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.realinspire.live/v1/quotes/random"
      );

      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error("Fetching error:", error);
    } finally {
      setLoading(false);
      setIsCopy(false);
    }
  };

  const copyText = async (textToCopy: any) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopy(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <section className="py-5">
      <div className="container mx-auto px-3">
        {/* Dashboard Wrapper */}
        <div>
          {/* Top background with overlay text */}
          <div className="relative rounded-md overflow-hidden">
            {/* Background Image Wrapper */}
            <div className="w-full h-[500px]">
              <img
                src={HeroSectionBackground}
                alt="Dashboard background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Motivation Quotes centered on background Image */}
            {!loading && (
              <div className="absolute inset-0 flex justify-center items-center mx-2 lg:mx-0">
                <h2 className="text-md md:text-lg lg:text-2xl font-bold text-white p-4 backdrop-blur-sm bg-gray-800/40 rounded-md text-center max-w-3xl mx-auto tracking-wide">
                  {quote?.content}
                  <br />
                  <span className="text-sm ">— {quote?.author}</span>
                </h2>
              </div>
            )}

            {/* refresh button on Image at right top cornor */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                className="bg-white p-2 rounded-sm cursor-pointer hover:text-[#6780FF]"
                onClick={() => fetchQuote()}>
                <i
                  className={`fa-solid fa-rotate-right ${
                    loading ? "animate-spin" : ""
                  }`}></i>
              </button>
              <button
                className="bg-white p-2 rounded-sm cursor-pointer hover:text-[#6780FF]"
                onClick={() => copyText(quote?.content)}>
                <i
                  className={`fa-solid ${isCopy ? "fa-check" : "fa-copy"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default quote;
