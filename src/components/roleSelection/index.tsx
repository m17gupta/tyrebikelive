"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const DynamicRoleSelector = ({ path, value, onChange }: { path?: string; value?: string; onChange?: (v: string) => void }) => {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>(value ?? "");

  useEffect(() => {
    const FetchRole = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/roles`, {
          withCredentials: true
        });
        if (response?.data?.docs) {
          setRoles(response.data.docs as any[]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    void FetchRole();
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    setSelectedRole(v);
    onChange?.(v);
  };

  return (
    <div style={{ margin: "10px 0", width: "100%" }}>
      <label style={{ display: "block", marginBottom: 6, fontWeight: 500, fontSize: 14, color: "#222" }}>
        Roles <span style={{ color: "#e53e3e" }}>*</span>
      </label>
      <select
        onChange={handleSelect}
        value={selectedRole}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          fontSize: 14,
          background: "#fff",
          color: selectedRole ? "#222" : "#888",
          outline: "none",
          marginTop: 2,
          boxSizing: "border-box"
        }}
      >
        <option value="" disabled>Select a value</option>
        <option value="admin">admin</option>
        {roles.map((r) => (
          <option key={r.id} value={r.roleTitle}>{r.roleTitle}</option>
        ))}
      </select>
    </div>
  );
};

