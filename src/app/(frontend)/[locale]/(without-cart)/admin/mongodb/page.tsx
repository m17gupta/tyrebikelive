"use client";

export const dynamic = 'force-dynamic';

import { NextPage } from "next";
import { useState } from "react";
import MongoDBForm from "@/components/mongoDb/MongoDbForm";
import { Button } from "@/components/ui/button";

const MongoDBManagementPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">MongoDB Database Management</h1>
        <p className="mb-8 text-gray-600">
          Create and manage MongoDB databases and collections for your application.
        </p>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Open Database Manager
        </Button>
      </div>

      <MongoDBForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MongoDBManagementPage;
