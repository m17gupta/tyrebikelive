'use client';

import React, { useEffect, useState } from 'react';

// CustomSelect — standalone version without @payloadcms/ui
// This was previously used as a Payload CMS field component.
// Without a connected form context, permissions are set as free-standing state.
export const PermissionAutoFill: React.FC<any> = (props) => {
  const [assignedTo, setAssignedTo] = useState<string>('');

  // When assignedTo changes, auto-fill permissions
  useEffect(() => {
    if (assignedTo) {
      // In standalone mode, permissions would be set via form state management
      // The actual permission fields should be managed by the parent form
      console.info('[PermissionAutoFill] assignedTo changed:', assignedTo);
    }
  }, [assignedTo]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="assigned-to" className="text-sm font-medium">Assigned To</label>
      <input
        id="assigned-to"
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        placeholder="Enter user ID or role..."
      />
    </div>
  );
};
