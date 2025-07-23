import Image from "next/image";

interface IncidentPlayerProps {
  currentIncident?: {
    id: number;
    type: string;
    camera: {
      name: string;
      location: string;
    };
    thumbnailUrl: string;
    // Add videoUrl for actual video support
    videoUrl?: String; // e.g. "/cctv/shop-footage.mp4"
  };
}

export default function IncidentPlayer({
  currentIncident,
}: IncidentPlayerProps) {
  return (
    <div className="bg-dark-800 rounded-2xl p-0 shadow-lg overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-4">
        <div className="flex items-center text-gray-200 text-xs bg-black/70 px-2 py-1 rounded">
          <svg width="16" height="16" fill="none" className="mr-1">
            <circle cx="8" cy="8" r="7" stroke="#FFA502" strokeWidth="2" />
            <circle cx="8" cy="8" r="3" fill="#FFA502" />
          </svg>
          {currentIncident ? currentIncident.camera.name : "Select Camera"}
        </div>
        <div className="text-xs text-gray-400 bg-black/60 px-2 py-1 rounded">
          {new Date().toLocaleString("en-GB")}
        </div>
      </div>
      {/* Video / image area */}
      <div className="relative w-full aspect-video bg-black mt-2 rounded-xl overflow-hidden">
        {/* {currentIncident?.videoUrl ? ( */}
        <video
          src={
            "https://media.istockphoto.com/id/1995820194/video/young-woman-shoplifting-in-a-convenience-store.mp4?s=mp4-640x640-is&k=20&c=Oz_MQBjErolJ3WCAMV5hFbV5obacv8dg2Hh4mvn4-DI="
          }
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
          style={{ backgroundColor: "#000" }}
        />
        {/* ) : currentIncident ? (
          <Image
            src={currentIncident.thumbnailUrl}
            alt={`${currentIncident.type} incident`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover rounded-xl"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-700">
            <span className="text-2xl">No Incident Selected</span>
          </div>
        )} */}

        {/* "REC" badge */}
        <div className="absolute top-3 left-3 bg-danger text-xs font-bold px-2 py-1 rounded flex items-center">
          <span className="mr-1 text-lg leading-none">●</span>REC
        </div>
      </div>
      {/* Mini Camera Strips – customize as needed */}
      <div className="flex gap-2 px-6 py-4 mt-2">
        <div style={{ position: "relative", width: 120, height: 72 }}>
          <Image
            src="https://placehold.co/160x90/333/white.png?text=Camera+02"
            alt="Camera 02"
            fill
            sizes="120px"
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-1 left-1 text-xs text-white bg-black/60 px-2 py-[2px] rounded">
            Camera 02
          </div>
        </div>
        <div style={{ position: "relative", width: 120, height: 72 }}>
          <Image
            src="https://placehold.co/160x90/333/white.png?text=Camera+03"
            alt="Camera 03"
            fill
            sizes="120px"
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-1 left-1 text-xs text-white bg-black/60 px-2 py-[2px] rounded">
            Camera 03
          </div>
        </div>
      </div>
    </div>
  );
}
