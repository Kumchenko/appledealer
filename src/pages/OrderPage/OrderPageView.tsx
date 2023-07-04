import OrderSection from "@/components/OrderSection/OrderSection"
import { IModels } from "@/interfaces"

export default function OrderPageView({models}: IModels) {
    return (
        <>
            <OrderSection models={models}/>
        </>
    )
}