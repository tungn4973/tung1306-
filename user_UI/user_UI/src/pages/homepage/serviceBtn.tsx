import type { Service } from "../../interface/services"

export default function ServiceBtn({ service }: { service: Service }) {
    return (
        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-600 cursor-pointer">
            <h3>{service.name}</h3>
            {/* <p>{service.description}</p> */}
        </div>
    )
}