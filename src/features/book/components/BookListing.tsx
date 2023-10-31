import React, { useEffect, useState, Fragment, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  deleteBookByIdAsync,
  fetchAllBooksAsync,
  fetchBookByIdAsync,
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

  return (
    <>
      {/* component */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <button
              type="button"
              className="font-bold font-serif bg-blue-700 py-2 px-4 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
            >
              <Link to={"/create-book"}>Create Book</Link>
            </button>
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
                  {books?.map((book:Book) => (
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
