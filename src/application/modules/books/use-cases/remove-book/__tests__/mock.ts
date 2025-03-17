import { Book } from "../../../entities/book";

export const book1 = new Book({
    name: "book1",
    description: "description1",
    coverUrl: "https://example.com/cover.jpg",
    totalAmount: 10,
    loanAmount: 0,
});
export const book2 = new Book({
    name: "book2",
    description: "description2",
    coverUrl: "https://example.com/cover.jpg",
    totalAmount: 10,
    loanAmount: 0,
});

export const books = [book1, book2];