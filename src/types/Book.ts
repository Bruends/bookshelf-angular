export interface Book {
    id? : number;
    title: string;
    img?: File;
    imgLink?: string; 
    category?: string;
    description: string;
}