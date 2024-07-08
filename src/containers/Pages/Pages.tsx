import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Layout from '../../components/Layout/Layout';
import AddAndEditForm from '../AddAndEditForm/AddAndEditForm';

const Pages = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <Home/>
        }/>
        <Route path="/meals/new" element={
          <AddAndEditForm/>
        }/>
        <Route path="/meals/:id/edit" element={
          <AddAndEditForm/>
        }/>
        <Route path="*" element={
          <PageNotFound/>
        }/>
      </Routes>
    </Layout>
  );
};

export default Pages;