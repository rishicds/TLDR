"use client"
import React from 'react';

const DesktopOnlyPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Please Use a Desktop or Laptop</h2>
      <p className="mb-4">This page is best viewed on a desktop or laptop computer.</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  </div>
);

export default DesktopOnlyPopup;
