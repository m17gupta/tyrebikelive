"use client";

import React, { useState } from "react";
import { Database } from "lucide-react";
import MongoDBForm from "../mongoDb/MongoDbForm";

interface MongoDBButtonCellProps {
  rowData: {
    id: string;
    name: string;
    email: string;
  };
}

const MongoDBButtonCell: React.FC<MongoDBButtonCellProps> = ({ rowData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        title={`Manage MongoDB for ${rowData.name}`}
      >
        <Database className="mr-1.5 h-4 w-4" />
        MongoDB
      </button>

      <MongoDBForm isOpen={isModalOpen} onClose={handleCloseModal} adminUser={rowData} />
    </>
  );
};

export default MongoDBButtonCell;

