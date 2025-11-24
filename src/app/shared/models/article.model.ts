export interface Article {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    date: Date;
    category: string;
    fullText?: string;
}