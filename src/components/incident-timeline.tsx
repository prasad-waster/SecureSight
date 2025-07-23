import { useMemo } from "react";
import type { Incident } from "@/types/incident";

interface IncidentTimelineProps {
  incidents: Incident[];
  onIncidentSelect: (incident: Incident) => void;
}

export default function IncidentTimeline({
  incidents,
  onIncidentSelect,
}: IncidentTimelineProps) {
  const timelineData = useMemo(() => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const totalMinutes = 24 * 60;

    return incidents.map((incident) => {
      const incidentStart = new Date(incident.tsStart);
      const minutesFromStart =
        (incidentStart.getTime() - startOfDay.getTime()) / (1000 * 60);
      const position = (minutesFromStart / totalMinutes) * 100;

      return {
        ...incident,
        position: Math.max(0, Math.min(100, position)),
      };
    });
  }, [incidents]);

  const hours = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        24-Hour Incident Timeline
      </h3>

      <div className="relative">
        {/* Timeline ruler */}
        <svg width="100%" height="80" className="mb-2">
          {/* Background line */}
          <line
            x1="0"
            y1="40"
            x2="100%"
            y2="40"
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Hour markers */}
          {hours.map((hour) => (
            <g key={hour}>
              <line
                x1={`${(hour / 24) * 100}%`}
                y1="30"
                x2={`${(hour / 24) * 100}%`}
                y2="50"
                stroke="#6B7280"
                strokeWidth="1"
              />
              <text
                x={`${(hour / 24) * 100}%`}
                y="25"
                textAnchor="middle"
                className="fill-gray-400 text-xs"
              >
                {hour.toString().padStart(2, "0")}:00
              </text>
            </g>
          ))}

          {/* Incident markers */}
          {timelineData.map((incident) => (
            <circle
              key={incident.id}
              cx={`${incident.position}%`}
              cy="40"
              r="4"
              className={`
                cursor-pointer transition-all hover:r-6
                ${incident.resolved ? "fill-gray-500" : "fill-red-500"}
              `}
              onClick={() => onIncidentSelect(incident)}
            />
          ))}

          {/* Current time indicator */}
          <line
            x1={`${
              (new Date().getHours() / 24) * 100 +
              (new Date().getMinutes() / (24 * 60)) * 100
            }%`}
            y1="20"
            x2={`${
              (new Date().getHours() / 24) * 100 +
              (new Date().getMinutes() / (24 * 60)) * 100
            }%`}
            y2="60"
            stroke="#3B82F6"
            strokeWidth="2"
          />
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Unresolved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Resolved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-0.5 h-4 bg-blue-500"></div>
            <span>Current Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
