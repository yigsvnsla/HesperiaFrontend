export interface Image {
    alternativeText: String
    caption: Date
    created_at: Date
    ext: string
    formats: Formats
    hash: string
    height: number
    id: number
    mime: string 
    name: string
    previewUrl: null
    provider: string
    provider_metadata: null
    size: number
    updated_at: Date
    url: Date
    width: number
}

export interface Formats{
    small:Format
    thumbnail:Format
}

export interface Format{
    ext: string
    hash: string
    height: number
    mime: string
    name: string
    path: null
    size: number
    url: string
    width: number
}
