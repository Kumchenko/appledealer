import OrderSection from '@/pages/Order/components/OrderSection/OrderSection'
import { IModels } from '@/interfaces'

export default function OrderPageView({ modelIds }: IModels) {
    return (
        <>
            <OrderSection modelIds={modelIds} />
        </>
    )
}
