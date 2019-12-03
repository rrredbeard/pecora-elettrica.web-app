export interface EBook {
  isbn: string;
  title: string;
  author: string;
  pages_no: number;
  replies: number;
  publication_date: Date;
  prev_edition: string | null;
}

export type Book = Readonly<EBook>;



