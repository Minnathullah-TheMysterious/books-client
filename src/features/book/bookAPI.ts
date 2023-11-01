import axios from "axios";
import toast from "react-hot-toast";
import { IUpdateBookParams } from "./components/UpdateBook";

interface BookResponseData {
  success: boolean;
  message: string;
  totalDocsCount: number;
  books: Book[];
}

interface DeleteBookResponseData {
  success: boolean;
  message: string;
}

interface fetchSingleBookResponseData {
  success: boolean;
  message: string;
  book: Book | null;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBook {
  title: string;
  author: string;
  summary: string;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
}

export interface searchObj {
  searchInput: string;
  page: number;
  limit: number;
}

/**************Create Book || POST************* */
export const createBook = async (
  createBookData: ICreateBook
): Promise<fetchSingleBookResponseData> => {
  try {
    const response = await axios.post<fetchSingleBookResponseData>(
      "/api/v1/book/create",
      createBookData
    );

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response.data;
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    } else if (error?.response?.status === 409) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    }

    toast.error(error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      book: null,
    };
  }
};

/**************Update Book By Id || PUT************* */
export const updateBookById = async (
  updateData: IUpdateBookParams
): Promise<fetchSingleBookResponseData> => {
  try {
    const response = await axios.put<fetchSingleBookResponseData>(
      `/api/v1/book/update/${updateData.bookId}`,
      updateData.bookData
    );

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response.data;
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      console.error(error);
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    } else if (error?.response?.status === 409) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      console.error(error);
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      console.error(error);
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    }

    toast.error(error.response.data.message);
    console.error(error);
    return {
      success: false,
      message: error.response.data.message,
      book: null,
    };
  }
};

/**************Fetch All Books || GET************* */
export const fetchAllBooks = async (
  pagination: IPaginationQuery
): Promise<BookResponseData> => {
  try {
    const response = await axios.get<BookResponseData>(
      `/api/v1/book/fetch-all?page=${pagination.page}&limit=${pagination.limit}`
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
        totalDocsCount: 0,
        books: [],
      };
    }
    toast.error(error.message);
    return {
      success: false,
      message: error.message,
      totalDocsCount: 0,
      books: [],
    };
  }
};

/**************Fetch All Books || GET************* */
export const fetchBookById = async (
  bookId: string
): Promise<fetchSingleBookResponseData> => {
  try {
    const response = await axios.get<fetchSingleBookResponseData>(
      `/api/v1/book/fetch/${bookId}`
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
        book: null,
      };
    }

    toast.error(error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      book: null,
    };
  }
};

/**************Delete Book By ID || DELETE************* */
export const deleteBookById = async (
  bookId: string
): Promise<DeleteBookResponseData> => {
  try {
    const response = await axios.delete<DeleteBookResponseData>(
      `/api/v1/book/delete/${bookId}`
    );

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response.data;
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message: error.response.data.message,
      };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
      };
    }

    toast.error(
      error.response.data.message ||
        "Something Went Wrong while deleting the book"
    );
    return {
      success: false,
      message:
        error.response.data.message ||
        "Something Went Wrong while deleting the book",
    };
  }
};

/**************Search Book By Title or Author || POST************* */
export const searchBookByTitleOrAuthor = async (
  searchData: searchObj
): Promise<BookResponseData> => {
  try {
    const response = await axios.post<BookResponseData>(`/api/v1/book/search?page=${searchData.page}&limit=${searchData.limit}`, {
      searchInput: searchData.searchInput,
    });

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      return response.data;
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message: error.response.data.message,
        totalDocsCount: 0,
        books: [],
      };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
        totalDocsCount: 0,
        books: [],
      };
    }

    toast.error(
      error.response.data.message ||
        "Something Went Wrong while searching the book"
    );
    return {
      success: false,
      message:
        error.response.data.message ||
        "Something Went Wrong while searching the book",
      totalDocsCount: 0,
      books: [],
    };
  }
};
