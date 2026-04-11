import React from "react";

const TopCollection = () => {
  return (
    <section className="w-full  pt-20 px-8 flex flex-col items-center justify-center bg-white">
      <div className="max-w-4xl text-center !space-y-4">
        <h1 className="text-4xl  font-bold tracking-tight text-black ">
          Traditions Reimagined
        </h1>
        <p className="text-gray-600 font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ">
          Inspired by tradional and elegant islamic way of dressing.
        </p>
      </div>

      <div className="mt-10 w-full  h-[80vh]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/YTDown.com_YouTube_Cologne-Perfume-Collection-LOUIS-VUITTON_Media_5-q59O9pZo8_001_1080p.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default TopCollection;
