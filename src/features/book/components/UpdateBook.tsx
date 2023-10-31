import React, { FC, useEffect, useState } from "react";
import {
  fetchBookByIdAsync,
  selectBook,
  updateBookByIdAsync,
} from "../bookSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ICreateBook } from "../bookAPI";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

export interface IUpdateBookParams {
  bookData: ICreateBook;
  bookId: string;
}

const UpdateBook: FC = () => {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);
  const params = useParams();
  const navigate = useNavigate();

  const bookId = params.bookId;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setSummary(book.summary || '');
    }
  }, [book]);

  useEffect(() => {
    dispatch(fetchBookByIdAsync(bookId || ""));
  }, [dispatch, bookId]);

  const updateParams: IUpdateBookParams = {
    bookData: {
      title: title || "",
      author: author || "",
      summary: summary || "",
    },
    bookId: bookId || "",
  };

  const handleUpdateBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(updateBookByIdAsync(updateParams));
      const originalPromiseResult = unwrapResult(resultAction);
      if (originalPromiseResult) {
        navigate("/");
      }
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError);
    }
  };

  return (
    <>
      <div className="isolate bg-white px-6 py-16 sm:py-10 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Update Book
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            "Books are a uniquely portable magic." - Stephen King
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={(e) => handleUpdateBookSubmit(e)}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="author"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Author
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="author"
                  id="author"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="summary"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Summary
              </label>
              <div className="mt-2.5">
                <textarea
                  name="summary"
                  id="summary"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
