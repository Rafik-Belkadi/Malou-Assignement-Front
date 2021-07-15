import { Topic } from "../pie/topic.interface";

interface Thumbnail {
    id: number;
    media_type: string;
    image_url: string;
}

export interface Product {
    comments_count: number;
    id: number;
    name: string;
    tagline: string;
    votes_count: number;
    day: string;
    created_at: Date;
    thumbnail: Thumbnail;
    redirect_url: string;
    topics: Topic[];
}