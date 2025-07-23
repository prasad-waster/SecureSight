"use client";

import { useState, useEffect } from "react";
import IncidentPlayer from "@/components/incident-player";
import IncidentList from "@/components/incident-list";
import IncidentTimeline from "@/components/incident-timeline";
import type { Incident } from "@/types/incident";

interface SelectedIncident {
  id: number;
  type: string;
  camera: {
    name: string;
    location: string;
  };
  thumbnailUrl: string;
}

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<
    SelectedIncident | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch incidents on component mount
  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/incidents?resolved=false");

      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }

      const data = await response.json();
      setIncidents(data);

      // Auto-select the first incident if available
      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident({
      id: incident.id,
      type: incident.type,
      camera: incident.camera,
      thumbnailUrl: incident.thumbnailUrl,
    });
  };

  const handleIncidentResolve = async (incidentId: number) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to resolve incident");
      }

      // Update local state optimistically
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === incidentId
            ? { ...incident, resolved: true }
            : incident
        )
      );

      // If the resolved incident was selected, clear selection
      if (selectedIncident?.id === incidentId) {
        const remainingIncidents = incidents.filter(
          (incident) => incident.id !== incidentId && !incident.resolved
        );
        setSelectedIncident(remainingIncidents[0] || undefined);
      }
    } catch (err) {
      console.error("Error resolving incident:", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-lg">Loading incidents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Incident Player */}
        <div className="lg:col-span-2">
          <IncidentPlayer currentIncident={selectedIncident} />
        </div>

        {/* Right side - Incident List */}
        <div className="lg:col-span-1">
          <IncidentList
            incidents={incidents}
            onIncidentSelect={handleIncidentSelect}
            onIncidentResolve={handleIncidentResolve}
          />
        </div>
      </div>

      {/* Bottom - Incident Timeline */}
      <div>
        <IncidentTimeline
          incidents={incidents}
          onIncidentSelect={handleIncidentSelect}
        />
      </div>
    </div>
  );
}
