"use client";
import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CustomHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        padding: '0 20px',
        borderBottom: '1px solid #e5e5e5',
        background: '#fff',
      }}
    >
      {/* Left Side Logo / Name */}
      <div style={{ fontSize: 18, fontWeight: 600 }}>My Admin Dashboard</div>

      {/* Right Side User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            padding: '6px 10px',
            background: '#f5f5f5',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomHeader;

