import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { WebsiteConfig } from "../utils/config";
import { WebsiteStatus } from "../utils/monitoring";

interface StatusGridProps {
  websites: WebsiteConfig[];
  statuses: WebsiteStatus[];
}

const StatusGrid = ({ websites, statuses }: StatusGridProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {websites.map((site, index) => {
        const status = statuses[index];
        return (
          <div
            key={site.url}
            className="border border-gray-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold mb-1">{site.name || site.url}</h3>
              <p className="text-sm text-gray-400">{site.url}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                {status?.responseTime ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {status.responseTime}ms
                  </div>
                ) : null}
              </div>
              {status?.isUp ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusGrid;