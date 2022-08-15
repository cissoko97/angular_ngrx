import * as fromBook from './book.actions';

describe('bookBooks', () => {
  it('should return an action', () => {
    expect(fromBook.bookActions.loadBook().type).toBe('[Book] Book Books');
  });
});
