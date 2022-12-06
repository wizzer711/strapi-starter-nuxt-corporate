import { Cta } from '~/types/global/globalCta'

interface PlanFeature {
    id: number,
    item: string
}
interface PlanAttributes {
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    description: string,
    title: string,
    cta: Cta,
    features: Array<PlanFeature>
}
interface Plan {
    id: number,
    attributes: PlanAttributes
}
interface PlansData {
    data: Array<Plan>
}
export interface Plans {
    plans?: PlansData
}