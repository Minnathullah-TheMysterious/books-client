import React, { FC } from 'react'
import Layout from '../features/layout/Layout'
import UpdateBook from '../features/book/components/UpdateBook'

const UpdateBookPage : FC = () => {
  return (
    <Layout title='BooksMMR - Update Book'>
      <UpdateBook/>
    </Layout>
  )
}

export default UpdateBookPage
