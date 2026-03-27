"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export interface Preset {
  name: string;
  type: string;
  value: any;
  id: string;
}

export const SaveToLibrary = ({ path }: { path?: string }) => {
  const [loading, setLoading] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [presetType, setPresetType] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const fetchTypesofSection = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/presets`
      );
      const data = response.data.docs;
      setPresets(data as Preset[]);
    };
    void fetchTypesofSection();
  }, []);

  const handleSave = async () => {
    if (!presetName.trim()) { setStatusMsg("Please enter a preset name"); return; }
    if (!presetType.trim()) { setStatusMsg("Please select a preset type"); return; }
    setLoading(true);
    try {
      const presetData = { name: presetName, type: presetType, value: {} };
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/presets`, presetData);
      setStatusMsg("Saved to Library");
      setPresetName("");
      setPresetType("");
      setShowSaveForm(false);
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to save preset");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (!selectedPreset) { setStatusMsg("Please select a preset to import"); return; }
    setStatusMsg(`Imported preset: ${selectedPreset}`);
  };

  return (
    <div className="space-y-4">
      {statusMsg && <p className="text-sm text-gray-600">{statusMsg}</p>}
      {/* Import Section */}
      <div className="flex items-center gap-2">
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          className="flex-1 h-9 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white"
        >
          <option value="">Select a preset to import</option>
          {presets.length === 0 ? (
            <option>No presets found</option>
          ) : (
            presets.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))
          )}
        </select>
        <Button onClick={handleImport} size="sm" disabled={!selectedPreset}>Import</Button>
      </div>

      {/* Save Section */}
      <div className="space-y-3">
        <Button onClick={() => setShowSaveForm(!showSaveForm)} size="sm" variant="secondary" className="w-full">
          {showSaveForm ? "Cancel Save" : "Save to Library"}
        </Button>
        {showSaveForm && (
          <div className="space-y-3 p-3 bg-gray-50 border border-gray-200 rounded">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Preset Name</label>
              <input
                type="text"
                placeholder="Enter preset name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="w-full h-9 px-3 py-1.5 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Preset Type</label>
              <select
                value={presetType}
                onChange={(e) => setPresetType(e.target.value)}
                className="w-full h-9 px-3 py-1.5 text-sm border border-gray-300 rounded"
              >
                <option value="">Select Type</option>
                <option value="section">Section</option>
                <option value="layout">Layout</option>
                <option value="component">Component</option>
                <option value="row">Row</option>
                <option value="column">Column</option>
              </select>
            </div>
            <Button onClick={handleSave} disabled={loading} size="sm" className="w-full">
              {loading ? "Saving..." : "Save Preset"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

