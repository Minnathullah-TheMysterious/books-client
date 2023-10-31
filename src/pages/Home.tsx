import React, { FC } from "react";
import Layout from "../features/layout/Layout";
import { BookListing } from "../features/book/components/BookListing";

const Home: FC = () => {
  return (
    <Layout title="BooksMMR - Home">
      <BookListing />
    </Layout>
  );
};

export default Home;
