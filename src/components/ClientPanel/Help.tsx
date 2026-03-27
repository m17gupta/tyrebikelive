import React from "react";

export const ClientHelp = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <p className="text-gray-600 mb-4">If you need assistance with your order, please contact our support team.</p>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-lg">Email Support</h3>
          <p className="text-gray-600">support@karloban.com</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-lg">Phone Support</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};
