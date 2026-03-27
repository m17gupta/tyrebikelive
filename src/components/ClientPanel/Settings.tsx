import React from "react";

export const Settings = ({ user }: { user?: any }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <p className="text-gray-600 mb-6">Manage your profile and account preferences.</p>
      
      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            disabled 
            value={user?.email || ""} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            defaultValue={user?.name || ""} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};
