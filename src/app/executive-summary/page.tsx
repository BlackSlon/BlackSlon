import React from 'react';
import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';

export default function ExecutiveSummaryPage() {
  const filePath = path.join(process.cwd(), 'ExSum.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="flex justify-center mb-16">
            <a href="/" className="cursor-pointer">
              <img src="/BS_image.jpg" alt="BlackSlon" className="h-48 w-auto hover:opacity-80 transition-opacity" />
            </a>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-amber-600 text-center">BlackSlone - Executive Summary</h1>
          <p className="text-gray-400 text-center">The New Architecture of European Energy Wholesale Markets</p>
        </div>

        <div className="prose prose-invert prose-headings:text-amber-500 prose-h1:text-amber-600 prose-h2:text-amber-500 prose-h3:text-amber-400 prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-hr:border-gray-700 prose-blockquote:border-l-amber-500 prose-blockquote:text-gray-300 prose-a:text-amber-400 prose-code:text-amber-300 max-w-none">
          <ReactMarkdown>{fileContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
