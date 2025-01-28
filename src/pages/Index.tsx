import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import ConfigEditor from "../components/ConfigEditor";
import StatusGrid from "../components/StatusGrid";
import { WebsiteConfig, loadConfig, saveConfig } from "../utils/config";
import { checkWebsiteStatus } from "../utils/monitoring";

const Index = () => {
  const [config, setConfig] = useState<WebsiteConfig[]>([
    { url: "https://example.com", name: "Example Site", checkInterval: 30 }
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const { data: statuses, isLoading, error } = useQuery({
    queryKey: ['websites', config],
    queryFn: async () => {
      const results = await Promise.all(
        config.map(site => checkWebsiteStatus(site.url))
      );
      return results;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    const savedConfig = loadConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleConfigSave = (newConfig: WebsiteConfig[]) => {
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsEditing(false);
    toast.success("Configuration saved successfully");
  };

  if (error) {
    toast.error("Error fetching website statuses");
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Website Monitor</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            {isEditing ? "Close Editor" : "Edit Config"}
          </button>
        </header>

        {isEditing ? (
          <ConfigEditor config={config} onSave={handleConfigSave} />
        ) : (
          <div className="border border-gray-800 rounded-lg p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
              </div>
            ) : (
              <StatusGrid websites={config} statuses={statuses || []} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;