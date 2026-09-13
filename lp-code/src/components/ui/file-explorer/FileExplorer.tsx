import { useState } from "react"
import { Folder } from "../folder-card/Folder"
import { ServiceCard } from "../service-card/ServiceCard"

type Service = {
  id: number
  title: string
}

/**
 * FileExplorer Component
 *
 * - Renderiza grid de serviços (folders)
 * - Controla estado do serviço ativo
 * - Responsável por abrir/fechar o ServiceCard
 */
export function FileExplorer() {
  const [activeService, setActiveService] = useState<number | null>(null)

  const services: Service[] = [
    { id: 1, title: "UI Design" },
    { id: 2, title: "Frontend" },
    { id: 3, title: "Backend" },
    { id: 4, title: "DevOps" },
    { id: 5, title: "Mobile" },
    { id: 6, title: "Data" }
  ]

  return (
    <div className="relative w-full">
      
      {/* GRID DE FOLDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 justify-items-center">
        {services.map((service) => (
          <Folder
            key={service.id}
            onClick={() => setActiveService(service.id)}
          />
        ))}
      </div>

      {/* MODAL DE SERVIÇO */}
      {activeService !== null && (
        <ServiceCard
          title={
            services.find(s => s.id === activeService)?.title || ""
          }
          onClose={() => setActiveService(null)}
        />
      )}
    </div>
  )
}