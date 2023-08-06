export interface Product {
    _id: string;
    title: string;
    description: string;
    imageCover: string;
    ratingsAverage: string;
    price: number;
    category: Category;
}

export interface Category {
    _id: string;
    slug: string
    name: string
    image: string
}