import { Component, OnInit } from '@angular/core';
import { CrudInterface } from 'app/interface';
import { IBook } from 'app/models/book.model';
import { BookStore } from 'app/store';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookStore]
})
export class BookComponent implements OnInit, CrudInterface<string, IBook> {
  book$ = this.bookStore.book$;
  selectedBook$ = this.bookStore.selectedBook$;
  isLoading$ = this.bookStore.isLoading$;
  title$ = this.bookStore.title$;
  data$ = this.bookStore.data$;

  ngOnInit(): void {
  }

  constructor(private readonly bookStore: BookStore) { }

  add(t?: IBook): void {

    let data: IBook = {
      uuid: 'BOOKADD',
      title: 'TITLEADD',
      description: 'DESCRIPTIONADD',
      totalChapter: 10
    }
    this.bookStore.addBook(data);
  }
  remove(i: string): void {
    this.bookStore.removeBook(i);
  }

  update(t: IBook): void {
    const label = 'update'.toUpperCase();
    let data: IBook = {
      uuid: t.uuid,
      title: `title${label}`.toUpperCase(),
      description: `description${label}`.toUpperCase(),
      totalChapter: 10
    }
    this.bookStore.updateBook(data);
  }

  trackBy(index: number, name: IBook): string {
    return name.uuid;
  }

  selectItem(item: IBook): void {
    this.bookStore.selectBook(item);
  }

  resetSelection(): void {
    this.bookStore.selectBook(undefined);
  }

  clear(): void {
    this.bookStore.resetState();
  }
}
