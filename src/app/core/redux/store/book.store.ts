import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IBook } from "app/core/models/book.model";
import { Observable } from "rxjs";

export type BookState = {
  books: Array<IBook>,
  selectedBook?: IBook,
  isLoading: boolean,
  title: string
}

@Injectable()
export class BookStore extends ComponentStore<BookState>{

  public readonly book$: Observable<Array<IBook>> = this.select(state => state.books);
  public readonly selectedBook$: Observable<IBook | undefined> = this.select(state => state.selectedBook);
  public readonly isLoading$: Observable<boolean> = this.select(state => state.isLoading);
  public readonly title$: Observable<string> = this.select(state => state.title);
  public readonly data$: Observable<BookState> = this.select(state => state);

  private count: number = 1;

  constructor() {
    super({ books: [], selectedBook: undefined, isLoading: false, title: 'Book Component' });

    const books: IBook[] = [{
      uuid: `BOOK${(this.count)}`,
      title: `TITLE${(this.count)}`,
      description: `DESCRIPTION${(this.count)}`,
      totalChapter: 12
    }, {
      uuid: `BOOK${(++this.count)}`,
      title: `TITLE${(this.count)}`,
      description: `DESCRIPTION${(this.count)}`,
      totalChapter: 12
    }, {
      uuid: `BOOK${(++this.count)}`,
      title: `TITLE${(this.count)}`,
      description: `DESCRIPTION${(this.count)}`,
      totalChapter: 12
    }, {
      uuid: `BOOK${(++this.count)}`,
      title: `TITLE${(this.count)}`,
      description: `DESCRIPTION${(this.count)}`,
      totalChapter: 12
    }];

    this.setState((state: BookState) => {
      return { ...state, books }
    });
  }

  readonly addBook = this.updater((state: BookState, book: IBook) => {
    return {
      ...state,
      books: [...(state.books), book]
    }
  });

  readonly removeBook = this.updater((state: BookState, bookId: string) => {
    return {
      ...state,
      books: state.books.filter((book: IBook) => book.uuid != bookId),
      selectedBook: state.selectedBook?.uuid === bookId ? undefined : state.selectedBook
    }
  });

  readonly updateBook = this.updater((state: BookState, book: IBook) => {
    return {
      ...state,
      books: state.books.map((current: IBook) => book.uuid === current.uuid ? book : current),
    }
  });

  readonly selectBook = this.updater((state: BookState, book?: IBook) => {
    return {
      ...state,
      selectedBook: book
    }
  });

  readonly resetState =
    this.updater((state) => {
      return { ...state, books: [], isLoading: false, selectedBook: undefined };
    });

  // readonly getMovie = this.effect((movieId$: Observable<string>) => {
  //   return movieId$.pipe(
  //      👇 Handle race condition with the proper choice of the flattening operator.
  //     switchMap((id) => this.moviesService.fetchMovie(id).pipe(
  //       👇 Act on the result within inner pipe.
  //       tapResponse(
  //         (movie) => this.addBook(movie as IBook),
  //         (e: HttpErrorResponse) => this.logError(e),
  //       ),
  //        👇 Handle potential error within inner pipe.
  //       catchError(() => EMPTY),
  //     )),
  //   );
  // });
}
