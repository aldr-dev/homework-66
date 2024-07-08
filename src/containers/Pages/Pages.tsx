import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Layout from '../../components/Layout/Layout';

const Pages = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <Home/>
        }/>
        <Route path="*" element={
          <PageNotFound/>
        }/>
      </Routes>
    </Layout>
  );
};

export default Pages;