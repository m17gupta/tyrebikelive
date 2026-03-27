import React from "react";

export const Orders = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <p className="text-gray-600 mb-6">View and track your recent orders.</p>
      
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-gray-500">You haven't placed any orders yet.</p>
        <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
          Start Shopping
        </button>
      </div>
    </div>
  );
};
