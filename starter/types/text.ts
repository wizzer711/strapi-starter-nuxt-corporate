import { Cta } from '~/types/global/globalCta'
import { Link } from '~/types/global/globalLink'

export interface Text {
    heading?: string,
    description?: string,
    alignment?: string,
    test?: string,
    cta?: Array<Cta>
    link?: Array<Link>
}