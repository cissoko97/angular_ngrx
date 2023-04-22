import * as fromBook from './book.actions';

describe('bookBooks', () => {
  it('should return an action', () => {
    expect(fromBook.bookActions.loadBook().type).toBe('[BOOK] load book');
    expect(fromBook.bookActions.loadBookFailed({ error: '' }).type).toBe('[BOOK] load book failed');
    expect(fromBook.bookActions.loadBookSuccess({ books: [] }).type).toBe('[BOOK] load book success');
  });
});
