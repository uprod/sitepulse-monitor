import { useState } from "react";
import { WebsiteConfig } from "../utils/config";
import { toast } from "sonner";

interface ConfigEditorProps {
  config: WebsiteConfig[];
  onSave: (config: WebsiteConfig[]) => void;
}

const ConfigEditor = ({ config, onSave }: ConfigEditorProps) => {
  const [sites, setSites] = useState<WebsiteConfig[]>(config);

  const handleAdd = () => {
    setSites([...sites, { url: "", name: "", checkInterval: 30 }]);
  };

  const handleRemove = (index: number) => {
    setSites(sites.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof WebsiteConfig, value: string | number) => {
    const newSites = [...sites];
    newSites[index] = { ...newSites[index], [field]: value };
    setSites(newSites);
  };

  const handleSave = () => {
    // Validate URLs
    const invalidSites = sites.filter(site => {
      try {
        new URL(site.url);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidSites.length > 0) {
      toast.error("Please enter valid URLs for all sites");
      return;
    }

    onSave(sites);
  };

  return (
    <div className="border border-gray-800 rounded-lg p-4">
      <div className="space-y-4">
        {sites.map((site, index) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Site Name"
              value={site.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded px-3 py-2 w-1/4"
            />
            <input
              type="text"
              placeholder="URL"
              value={site.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded px-3 py-2 flex-1"
            />
            <input
              type="number"
              placeholder="Check Interval (s)"
              value={site.checkInterval}
              onChange={(e) => handleChange(index, "checkInterval", parseInt(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded px-3 py-2 w-32"
            />
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-400 px-2 py-1"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleAdd}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
        >
          Add Site
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigEditor;