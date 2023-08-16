import OrderSection from '@/components/OrderSection/OrderSection'
import { IModels } from '@/interfaces'

export default function OrderPageView({ modelIds }: IModels) {
    return (
        <>
            <OrderSection modelIds={modelIds} />
        </>
    )
}
