

"use client";

import { useState } from "react";
import {
  Cross,
  File,
  Laptop,
  Layers,
  List,
  Settings,
  Smartphone,
  Tablet,
  Wand2,
  X,
} from "lucide-react";
import { createUsePuck, Puck, usePuck } from "@measured/puck";
import { useContentPanel } from "@/utilities/useTabChange";
import axios from "axios";

export const PuckComponent = ({data,mode}) => {
  const usePuck = createUsePuck()
  const {isContentPanelOpen, setIsContentPanelOpen, handleTabChange, activeTab} = useContentPanel()
  const appState = usePuck((s) => s.appState); 
  const dispatch = usePuck((s) => s.dispatch); 

  const { ui } = appState;

  const formatForInput = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toISOString().slice(0,16); // "YYYY-MM-DDTHH:MM"
};


   const [pageData, setPageData] = useState({
    title: data ? data.title : "",
    slug: data ? data.slug: "",
    website: data ? data.website.id : "",
    createdBy: "",
    publishedAt: data ? formatForInput(data.publishedAt) : "",
  });

  const handleSaveOrUpdate = async () => {

    

    if(mode=="create"){

    }
    else{
      const finaldata = {...pageData, "Page Data": appState.data, publishedAt: new Date(pageData.publishedAt).toISOString()}
      const save = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/${data.id}`, {
        "Page Data": appState.data
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
    
  }

  // Page management state
 
  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPageData({
      ...pageData,
      title: newTitle,
      slug: generateSlug(newTitle),
    });
  };

  const handleFieldChange = (field: string, value: string) => {
    setPageData({
      ...pageData,
      [field]: value,
    });
  };

  const tabs = [
    { id: "ai", icon: Wand2, label: "AI", color: "blue" },
    { id: "blocks", icon: Layers, label: "Blocks", color: "gray" },
    { id: "fields", icon: Settings, label: "Fields", color: "gray" },
    { id: "outline", icon: List, label: "Outline", color: "gray" },
    { id: "page-manage", icon: File, label: "Page Manage", color: "gray" },
  ];

  const screen = [
    {
      id: 1,
      icon: Smartphone,
      value: 360,
    },
    {
      id: 2,
      icon: Tablet,
      value: 768,
    },
    {
      id: 3,
      icon: Laptop,
      value: 1280,
    },
  ];

  const handleSwitchDevices = (e: any, value: number) => {
    e.preventDefault();
    dispatch({
      type: "setUi",
      ui: {
        ...ui,
        viewports: {
          ...ui.viewports,
          current: {
            ...ui.viewports.current,
            width: value,
          },
        },
      },
    });
  };

  return (
    <div className="flex relative h-screen">
      {/* Icon Sidebar */}
      <div className="flex sticky">
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all relative group ${
                  isActive
                    ? tab.id === "ai"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="text-[9px] font-medium mt-0.5">
                  {tab.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r ${
                      tab.id === "ai" ? "bg-blue-600" : "bg-gray-900"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div
        
          className={`${
            isContentPanelOpen ? "w-80" : "w-0"
          } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden flex-shrink-0`}
        >
          {/* Panel Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 capitalize">
              {activeTab}
            </h2>
            <button
            onClick={()=> {
              setIsContentPanelOpen(false)
            }}
            className="cursor-pointer p-1 bg-gray-500 hover:bg-gray-300 rounded-2xl">
              <X className="text-white" size={15}/>
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-4 overflow-y-auto flex-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Components
            </h3>
            <div className="space-y-2">
              {activeTab === "blocks" && (
                <div className="text-gray-600 text-sm">
                  <Puck.Components />
                </div>
              )}
              {activeTab === "fields" && (
                <div className="text-gray-600 text-sm">
                  <Puck.Fields />
                </div>
              )}
              {activeTab === "outline" && (
                <div className="text-gray-600 text-sm">
                  <Puck.Outline />
                </div>
              )}
              {activeTab === "ai" && (
                <div className="text-gray-600 text-sm">AI content here</div>
              )}
              {activeTab === "page-manage" && (
                <div className="space-y-4">
                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={pageData.title}
                      onChange={handleTitleChange}
                      placeholder="Enter page title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Slug Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={pageData.slug}
                      onChange={(e) => handleFieldChange("slug", e.target.value)}
                      placeholder="auto-generated-slug"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-generated from title, but can be edited
                    </p>
                  </div>

                  {/* Website Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.website}
                      onChange={(e) => handleFieldChange("website", e.target.value)}
                      placeholder="https://example.com"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Created By Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Created By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pageData.createdBy}
                      onChange={(e) => handleFieldChange("createdBy", e.target.value)}
                      placeholder="Enter creator name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Published At Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Published At
                    </label>
                    <input
                      type="datetime-local"
                      value={pageData.publishedAt}
                      onChange={(e) => handleFieldChange("publishedAt", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center bg-gray-50 overflow-auto">
        <div className="w-full">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Preview Area</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {screen.map((d) => (
                  <button
                    key={d.id}
                    onClick={(e) => handleSwitchDevices(e, d.value)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                  >
                    <d.icon />
                  </button>
                ))}
              </div>
              <button
                onClick={handleSaveOrUpdate}
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
              >
                {mode=="edit" ? "Update Page" : "Publish Page"}
              </button>
            </div>
          </div>

          {/* Scrollable Preview */}
          <div className="p-8 flex justify-center">
            <div
              style={{
                width: `${ui.viewports.current.width}px`,
                minHeight: "100vh",
                pointerEvents: "unset",
              }}
            >
              <Puck.Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

