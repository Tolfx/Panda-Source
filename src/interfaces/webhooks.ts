export interface embededWebhook {
    title?: any
    description?: any
    footer?: footer
    author?: author
    color?: string
    timestamp?: boolean
}

interface author {
    name: any
    iconURL?
    url?
}

interface footer {
    text: any
    iconURL?
}