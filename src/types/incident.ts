export interface Incident {
  id: number;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: {
    id: number;
    name: string;
    location: string;
  };
  videoUrl?: string;
}
