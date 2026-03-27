"use client";

import { useContentPanel } from "@/utilities/useTabChange";
import { ActionBar } from "@measured/puck";
import { Edit2, FileText } from "lucide-react";

export const Bar = ({ children,label,parentAction }) => {
    const {handleTabChange, activeTab} = useContentPanel()
 
  return (
    <ActionBar label={label}>
      <ActionBar.Group>
        
        <ActionBar.Action onClick={() => handleTabChange("fields")}>
            <Edit2 size={17}/>
        </ActionBar.Action>
        {children}</ActionBar.Group>
      
    </ActionBar>
  );
};

