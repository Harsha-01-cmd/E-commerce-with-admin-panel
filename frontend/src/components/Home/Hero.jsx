import React from 'react'; // eslint-disable-line no-unused-vars

const Hero = () => {
  return (
    <div className='h-auto mt-4 flex flex-col md:flex-row justify-center items-center px-2 md:px-10'>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold'>
          Discover Your Style
        </h1>
        <p className='py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base'>
          What suits you the best! Create your own Fashion! Be your own Influencer!!!
        </p>
        <div>
          <button className="text-white text-sm sm:text-base md:text-xl border border-blue-500 rounded hover:text-zinc-800 hover:bg-blue-300 transition-all duration-300 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 mt-2 sm:mt-3 md:mt-4">
            Discover Dresses
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center mt-4 md:mt-0">
        <img src="/utilities/heroimg.png.jpg" alt="main img" className="max-w-full h-auto"/>
      </div>
    </div>
  );
}

export default Hero;







