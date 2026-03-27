"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type ContentPanelContextType = {
  isContentPanelOpen: boolean;
  setIsContentPanelOpen: (isOpen: boolean) => void;
  activeTab: string;
  handleTabChange: (tabId: string) => void;
};

const ContentPanelContext = createContext<ContentPanelContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [isContentPanelOpen, setIsContentPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fields");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsContentPanelOpen(true);
  };

  return (
    <ContentPanelContext.Provider
      value={{
        isContentPanelOpen,
        setIsContentPanelOpen,
        activeTab,
        handleTabChange,
      }}
    >
      {children}
    </ContentPanelContext.Provider>
  );
}

export function useContentPanel() {
  const context = useContext(ContentPanelContext);
  if (context === undefined) {
    throw new Error("useContentPanel must be used within a TabProvider");
  }
  return context;
}

