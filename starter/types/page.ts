interface Seo {
    id: number,
    metaTitle: string,
    metaDescription: string,
    keywords: string,
    metaRobots: string,
    structuredData: string | null,
    metaViewport: string | null,
    canonicalURL: string | null
}

export interface Page {
    seo: Seo,
    title: string,
    slug: string
}