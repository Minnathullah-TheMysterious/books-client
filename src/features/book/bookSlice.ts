import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Book,
  ICreateBook,
  createBook,
  deleteBookById,
  fetchAllBooks,
  fetchBookById,
  searchBookByTitleOrAuthor,
  updateBookById,
} from "./bookAPI";
import { IUpdateBookParams } from './components/UpdateBook';

export interface BookState {
  loading: boolean;
  items: Array<Book>;
  selectedBook: null | Book;
  error: string | null | undefined;
}

const initialState: BookState = {
  loading: false,
  items: [],
  selectedBook: null,
  error: null,
};

export const createBookAsync = createAsyncThunk(
  "book/createBook",
  async (bookData: ICreateBook) => {
    try {
      const response = await createBook(bookData);
      if (response?.success) {
        return response?.book;
      }
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const updateBookByIdAsync = createAsyncThunk(
  "book/updateBookById",
  async (updateData: IUpdateBookParams) => {
    try {
      const response = await updateBookById(updateData);
      if (response?.success) {
        return { response: response?.book, _id: updateData.bookId };
      }
      console.error(response?.message)
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const fetchAllBooksAsync = createAsyncThunk(
  "book/fetchAllBooks",
  async () => {
    try {
      const response = await fetchAllBooks();
      if (response?.success) {
        return response?.books;
      }
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const fetchBookByIdAsync = createAsyncThunk(
  "book/fetchBookById",
  async (bookId: string) => {
    try {
      const response = await fetchBookById(bookId);
      if (response?.success) {
        return response?.book;
      }
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const deleteBookByIdAsync = createAsyncThunk(
  "book/deleteBookById",
  async (bookId: string) => {
    try {
      const response = await deleteBookById(bookId);
      if (response?.success) {
        return bookId;
      }
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const searchBookByTitleOrAuthorAsync = createAsyncThunk(
  "book/searchBookByTitleOrAuthor",
  async (searchInput: string) => {
    try {
      const response = await searchBookByTitleOrAuthor(searchInput);
      if (response?.success) {
        return response.books;
      }
      throw new Error(response?.message);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBookAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== null) {
          state.items.push(action.payload);
        }
      })
      .addCase(createBookAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateBookByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1 && action.payload.response !== null) {
          state.items.splice(index, 1, action.payload.response);
        }
      })
      .addCase(updateBookByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllBooksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBooksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllBooksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchBookByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteBookByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      })
      .addCase(deleteBookByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(searchBookByTitleOrAuthorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBookByTitleOrAuthorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload
      })
      .addCase(searchBookByTitleOrAuthorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllBooks = (state: RootState) => state?.book?.items;
export const selectBook = (state: RootState) => state?.book?.selectedBook;

export default bookSlice.reducer;
