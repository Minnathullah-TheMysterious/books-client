import React from "react";
import Layout from "../features/layout/Layout";
import CreateBook from "../features/book/components/CreateBook";

const CreateBookPage = () => {
  return (
    <Layout title="BookMMR - Create Book">
      <CreateBook />
    </Layout>
  );
};

export default CreateBookPage;
