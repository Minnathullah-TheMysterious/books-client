import React, { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  title: string;
  description?: string;
  author?: string;
  keywords?: string;
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  author,
  children,
  keywords,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "BooksMMR",
  author: "Minnathullah Rahmani",
  description: "Books",
  keywords: "Books",
};

export default Layout;
