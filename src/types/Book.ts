export interface Book {
    id? : number;
    title: string;
    img?: File;
    imgPath?: string; 
    category?: string;
    author?: string;
    description: string;
}