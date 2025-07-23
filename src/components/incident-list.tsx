import { useState } from 'react'
import Image from 'next/image'
import { formatTimeRange, getIncidentTypeColor, getIncidentTypeIcon } from '@/lib/utils'

interface Incident {
  id: number
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  camera: {
    name: string
    location: string
  }
}

interface IncidentListProps {
  incidents: Incident[]
  onIncidentSelect: (incident: Incident) => void
  onIncidentResolve: (incidentId: number) => void
}

export default function IncidentList({ 
  incidents, 
  onIncidentSelect, 
  onIncidentResolve 
}: IncidentListProps) {
  const [resolvingIds, setResolvingIds] = useState<Set<number>>(new Set())

  const handleResolve = async (incidentId: number, e: React.MouseEvent) => {
    e.stopPropagation()

    setResolvingIds(prev => new Set([...prev, incidentId]))

    try {
      await onIncidentResolve(incidentId)
    } catch (error) {
      console.error('Failed to resolve incident:', error)
    } finally {
      setResolvingIds(prev => {
        const next = new Set(prev)
        next.delete(incidentId)
        return next
      })
    }
  }

  const unresolvedIncidents = incidents.filter(incident => !incident.resolved)

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          {unresolvedIncidents.length} Unresolved Incidents
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {unresolvedIncidents.map((incident) => {
          const isResolving = resolvingIds.has(incident.id)

          return (
            <div
              key={incident.id}
              onClick={() => onIncidentSelect(incident)}
              className={`
                bg-gray-800 rounded-lg p-3 cursor-pointer transition-all duration-200
                hover:bg-gray-700 border border-gray-700 hover:border-gray-600
                ${isResolving ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-start space-x-3">
                {/* Thumbnail */}
                <div className="relative w-16 h-12 flex-shrink-0">
                  <Image
                    src={incident.thumbnailUrl}
                    alt={`${incident.type} incident`}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">
                        {getIncidentTypeIcon(incident.type)}
                      </span>
                      <div className={`
                        w-2 h-2 rounded-full ${getIncidentTypeColor(incident.type)}
                      `} />
                      <span className="text-white font-medium text-sm">
                        {incident.type}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleResolve(incident.id, e)}
                      disabled={isResolving}
                      className="
                        px-3 py-1 bg-green-600 hover:bg-green-700 
                        text-white text-xs rounded transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      {isResolving ? 'Resolving...' : 'Resolve'}
                    </button>
                  </div>

                  <div className="text-gray-400 text-xs mb-1">
                    📍 {incident.camera.location}
                  </div>

                  <div className="text-gray-500 text-xs">
                    {formatTimeRange(
                      new Date(incident.tsStart), 
                      new Date(incident.tsEnd)
                    )} on {new Date(incident.tsStart).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {unresolvedIncidents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">✅</div>
            <div>No unresolved incidents</div>
          </div>
        )}
      </div>
    </div>
  )
}
