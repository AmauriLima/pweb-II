import { IHttpRequest } from "@/application/shared/http/interfaces/http";
import { BookRepository } from "../../../repositories/book-repository";
import { makeBookRepositoryTest } from "../../../repositories/make-book-repository-test";
import { books } from "./mock";
import { makeRemoveBookUseCase } from "../factories/make-remove-book-use-case";
import { RemoveBookUsecase } from "../remove-book-use-case";
import { makeRemoveBookController } from "../factories/make-remove-book-controller";
import { RemoveBookController } from "../remove-book-controller";
describe("Remove book controller", () => {
    let repo: BookRepository;
    let useCase: RemoveBookUsecase;
    let controller: RemoveBookController;

    beforeEach(async () => {
        repo = makeBookRepositoryTest();
        useCase = makeRemoveBookUseCase(repo);
        controller = makeRemoveBookController(useCase);
    });

    it("deve remover um livro com sucesso", async () => {
        repo.createBook(books[0]);
        const response = await controller.handle({
            params: {
                bookId: books[0].id
            }
        } as unknown as IHttpRequest);

        const { books: booksList } = await repo.getBooks({});
        expect(response.body).toBe(undefined);
        expect(response.statusCode).toBe(204);
        expect(booksList).toHaveLength(0);
    }
    );

    it("deve lançar erro 404 ao remover um livro inexistente", async () => {
        await expect(controller.handle({
            params: {
                bookId: books[0].id
            }
        } as unknown as IHttpRequest)).rejects.toThrow();
    }
    );



    
});