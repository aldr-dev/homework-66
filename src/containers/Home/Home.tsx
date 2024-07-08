import React, {useEffect, useState} from 'react';
import {ApiMeal} from '../../types';
import {toast} from 'react-toastify';
import axiosApi from '../../axiosApi';
import {Link} from 'react-router-dom';
import './Home.css';
import Card from '../../components/Card/Card';
import Preloader from '../../components/Preloader/Preloader';

const Home = () => {
  const [meals, setMeals] = useState<ApiMeal[] | null>([]);
  const [isLoaderGet, setIsLoaderGet] = useState(false);
  const [isLoaderDelete, setIsLoaderDelete] = useState(false);

  useEffect(() => {
    const data = async () => {
      try {
        setIsLoaderGet(true);
        const response = await axiosApi.get<ApiMeal | null>('/meals.json');
        setIsLoaderGet(false);

        if (response.status !== 200) {
          toast.error('An error has occurred. Failed to process information.');
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

        if (response.data !== null) {
          const dataArray: ApiMeal[] = Object.keys(response.data).map((id) => ({
            id,
            ...response.data[id],
          }));
          setMeals(dataArray);
        } else {
          setMeals([]);
        }
      } catch (error) {
        setIsLoaderGet(false);
        toast.error('An error has occurred. Failed to process information.');
        console.error('An error has occurred. Failed to process information. ' + error);
      }
    };
    void data();
  }, []);


  let totalCalories;
  if (meals) {
      totalCalories = meals.reduce((acc, meal) => {
      return acc + Number(meal.calories);
    }, 0);
  }


  const deletePost = async (id: string) => {
    const confirmDelete = confirm('Are you sire you want to delete this post?');
    try {
      if (confirmDelete) {
        setIsLoaderDelete(true);
        const response = await axiosApi.delete<ApiMeal>(`/meals/${id}.json`);
        setIsLoaderDelete(false);
        toast.success('The food post was successfully deleted');

        if (response.status !== 200) {
          toast.error('An error has occurred. Failed to process information.');
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

        if (meals !== null) {
          const updatedPosts = meals.filter(post => post.id !== id);
          setMeals(updatedPosts);
        }
      }
    } catch (error) {
      setIsLoaderDelete(false);
      toast.error('An error has occurred. Failed to process information.');
      console.error('An error has occurred. Failed to process information. ' + error);
    }
  };

  return (
    <>
      <Preloader preloader={isLoaderGet} />
      <div className="total-calories-inner">
        <span>Total calories: <strong>{totalCalories} kcal</strong></span>
        <Link className="btn-add-meal" to="/meals/new">Add new meal</Link>
      </div>
      {meals && meals.length > 0 ? (
        <>
          {meals.map((meal) => (
            <Card key={meal.id} meal={meal} onDelete={deletePost} isLoaderDelete={isLoaderDelete}/>
          ))}
        </>
      ): (<p>No meal found. Please add new meal.</p>)}
    </>
  );
};

export default Home;