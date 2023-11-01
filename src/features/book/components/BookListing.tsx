import React, { useEffect, useState, Fragment, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  deleteBookByIdAsync,
  fetchAllBooksAsync,
  fetchBookByIdAsync,
  searchBookByTitleOrAuthorAsync,
  selectAllBooks,
  selectBook,
} from "../bookSlice";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillCloseCircle, AiFillDelete, AiFillEye } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ReactModal from "react-modal";
import { Book } from "../bookAPI";
import { Link } from "react-router-dom";

export function BookListing() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const book: Book | null = useAppSelector(selectBook);

  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllBooksAsync());
  }, [dispatch]);

  const handleBookDelete = (bookId: string) => {
    dispatch(deleteBookByIdAsync(bookId));
  };

  const handleBookPreview = (bookId: string) => {
    dispatch(fetchBookByIdAsync(bookId));
    setIsModalOpen(true);
  };

  const handleSearchBook = () => {
    dispatch(searchBookByTitleOrAuthorAsync(searchInput));
  };

  return (
    <>
      {/* component */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Books</h2>
            </div>
            <button
              type="button"
              className="font-bold font-serif bg-blue-700 py-2 px-4 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
            >
              <Link to={"/create-book"}>Create Book</Link>
            </button>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span
                className={`h-full absolute inset-y-0 left-0 flex items-center pl-2 hover:cursor-pointer ${
                  searchInput.length === 0 ? "pointer-events-none" : null
                }`}
                onClick={() => handleSearchBook()}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500 hover:h-5 hover:w-5 active:h-4 active:w-4"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search By Author or Title"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      UpdatedAt
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books?.map((book: Book) => (
                    <tr key={book._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {book.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {book.author}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(book?.createdAt).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(book?.updatedAt).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex whitespace-no-wrap text-2xl space-x-2">
                          <Link to={`/update-book/${book?._id}`}>
                            <BsPencilSquare className="text-green-600 hover:cursor-pointer" />
                          </Link>

                          <AiFillEye
                            className="text-blue-600 hover:cursor-pointer"
                            onClick={() => {
                              handleBookPreview(book?._id);
                            }}
                          />
                          <AiFillDelete
                            className="text-red-600 hover:cursor-pointer"
                            onClick={() => {
                              setBookId(book?._id);
                              setOpen(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* confirmation modal */}
              <Transition.Root show={open} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  initialFocus={cancelButtonRef}
                  onClose={setOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationTriangleIcon
                                  className="h-6 w-6 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-base font-semibold leading-6 text-gray-900"
                                >
                                  Delete Book
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Are you sure you want to delete the book?
                                    All of your data will be permanently
                                    removed. This action cannot be undone.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              onClick={() => {
                                setOpen(false);
                                handleBookDelete(bookId);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>

              {/* Modal for showing book details */}
              <ReactModal
                isOpen={isModalOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalOpen(false)}
                closeTimeoutMS={0}
                style={{
                  overlay: { backgroundColor: "gray" },
                  content: { marginTop: "70px" },
                }}
                shouldFocusAfterRender={true}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                shouldReturnFocusAfterClose={true}
                preventScroll={false}
              >
                <AiFillCloseCircle
                  onClick={() => setIsModalOpen(false)}
                  className="text-2xl ml-auto hover:cursor-pointer"
                />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-1 space-y-12">
                  <div>
                    <h1 className="sm:text-2xl text-[8px] font-bold text-gray-900 shadow-cyan-800 shadow  inline border-none py-1 px-1">
                      Book Title: {book?.title}
                    </h1>
                    <div className="flex justify-between my-1">
                      <p className="sm:text-lg text-base font-medium font-serif text-gray-900">
                        Book Author:{" "}
                        <span className="text-green-700">{book?.author}</span>
                      </p>
                    </div>
                    <div className="bg-gray-200 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flow-root">{book?.summary}</div>
                    </div>
                  </div>
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
