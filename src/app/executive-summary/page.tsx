import React from 'react';

export default function ExecutiveSummaryPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="flex justify-center mb-16">
            <a href="/" className="cursor-pointer">
              <img src="/BS_image.jpg" alt="BlackSlon" className="h-60 w-auto hover:opacity-80 transition-opacity" />
            </a>
          </div>
          <h1 className="text-6xl mb-8 text-amber-600 text-center font-bold">Too late...</h1>
          <p className="text-2xl text-gray-400 text-center">:(</p>
        </div>
      </div>
    </div>
  );
}
