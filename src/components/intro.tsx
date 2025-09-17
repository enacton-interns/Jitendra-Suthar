const intro = ({ background, heading }: any) => {
  return (
    <section className="py-5">
      <div className="container mx-auto px-3">
        <div>
          {/* Top background with overlay text */}
          <div className="relative rounded-md overflow-hidden">
            {/* Background Image Wrapper */}
            <div className="w-full h-[500px]">
              <img
                src={background}
                alt="Dashboard background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 w-full">
              <h2 className="uppercase text-sm md:text-md lg:text-lg font-bold text-white p-4 backdrop-blur-sm bg-gray-800/40 rounded-md text-center max-w-2xl mx-auto tracking-wide">
                {heading}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default intro;
