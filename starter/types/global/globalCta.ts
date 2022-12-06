interface Attributes {
    title: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string
}
interface Data {
    id: number,
    attributes: Attributes
}
interface Page {
    data: Data
}

export interface Cta {
    id: number,
    external: string,
    url: string,
    hash: string,
    target: string,
    label: string,
    liveChatTrigger: boolean,
    page: Page
}