import React from 'react';

const TestComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-8">Test Component</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Card 1</h2>
            <p className="text-gray-600">This is a test card to verify Tailwind styling.</p>
            <button className="btn btn-primary mt-4">Primary Button</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Card 2</h2>
            <p className="text-gray-600">Another test card to verify Tailwind styling.</p>
            <button className="btn btn-secondary mt-4">Secondary Button</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent; 