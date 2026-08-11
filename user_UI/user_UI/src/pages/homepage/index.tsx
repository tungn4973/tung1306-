import type { Service } from "../../interface/services"
import ServiceBtn from "./serviceBtn"

const title = "Xã X"

const data: Service[] = [
    {
        id: "1",
        name: "Chứng thực chữ ký",
        description: "Thủ tục chứng thực chữ ký trong các giấy tờ, văn bản (áp dụng cho cả trường hợp chứng thực điểm chỉ và trường hợp người yêu cầu chứng thực không thể ký, không thể điểm chỉ được)"
    },
    {
        id: "2",
        name: "Chứng thực hợp đồng",
        description: "Thủ tục chứng thực hợp đồng, giao dịch liên quan đến tài sản là động sản, quyền sử dụng đất, nhà ở"
    }
]

export default function HomePage() {
    return (
        <>
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                Phục vụ người dân nộp tài liệu, hồ sơ trực tuyến và các dịch vụ công khác.
            </div>
            <div>
                <input type="text" placeholder="Tìm kiếm dịch vụ" />
            </div>
            <div>
                <div>Dịch vụ công</div>
                {data.length === 0 ? (
                    <div>Không có dịch vụ công nào</div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.map((service) => (
                            <ServiceBtn key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}