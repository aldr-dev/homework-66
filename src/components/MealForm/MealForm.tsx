import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiMeal, ApiMealForm} from '../../types';
import {toast} from 'react-toastify';
import Preloader from '../Preloader/Preloader';
import './MealForm.css';

const MealForm = () => {
  const {id} = useParams();
  const [meal, setMeal] = useState({
    category: '',
    description: '',
    calories: '',
  });
  const [isLoaderGet, setIsLoaderGet] = useState(false);
  const [isLoaderUpdate, setIsLoaderUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const data = async () => {
        try {
          setIsLoaderGet(true);
          const response = await axiosApi.get<ApiMeal | null>(`/meals/${id}.json`);
          setIsLoaderGet(false);

          if (response.status !== 200) {
            toast.error('An error has occurred. Failed to process information');
            throw new Error('An error has occurred. Failed to process information. ' + response.status);
          }

          if (response.data !== null) {
            setMeal((prevState) => {
              return {
                ...prevState,
                calories: response.data.category,
                description: response.data.description,
                category: response.data.category,
              };
            });
          }
        } catch (error) {
          setIsLoaderGet(false);
          toast.error('An error has occurred. Failed to process information');
          console.error('An error has occurred. Failed to process information. ' + error);
        }
      };
      void data();
    }
  }, [id]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setMeal((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (meal.calories.length !== 0 && meal.description.length !== 0 && meal.calories.length !== 0) {
      try {
        setIsLoaderUpdate(true);
        let response;
        if (id) {
          response = await axiosApi.put<ApiMealForm>(`/meals/${id}.json`, meal);
          toast.success('Meal data was successfully updated.');
        } else {
          setMeal({category: '', description: '', calories: '',});
          response = await axiosApi.post<ApiMealForm>('/meals.json', meal);
          navigate('/');
          toast.success('Food data has been added successfully.');
        }
        setIsLoaderUpdate(false);

        if (response.status !== 200) {
          toast.error('An error has occurred. Failed to process information');
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

      } catch (error) {
        setIsLoaderUpdate(false);
        toast.error('An error has occurred. Failed to process information');
        console.error('An error has occurred. Failed to process information. ' + error);
      }
    }
  };

  return (
    <>
      <Preloader preloader={isLoaderGet} />
      <div className="form-wrapper">
        <h3 className="form-title">Add / edit meal</h3>
        <form onSubmit={onFormSubmit} className="form">
          <label htmlFor="category">Category:</label>
          <select
            onChange={onFieldChange}
            id="category"
            value={meal.category}
            className="form-select"
            name="category"
            required>
            <option value="">Select Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="snack">Snack</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <label htmlFor="description">Meal Description:</label>
          <textarea
            onChange={onFieldChange}
            id="description"
            value={meal.description}
            className="form-description"
            name="description"
            placeholder="Meal Description"
            required>
          </textarea>
          <label htmlFor="calories">Calories:</label>
          <input
            onChange={onFieldChange}
            id="calories"
            value={meal.calories}
            className="form-input"
            type="number"
            name="calories"
            min="0"
            placeholder="Enter the number of calories"
            required
          />
          <button className="form-btn" disabled={isLoaderUpdate} type="submit">
            <div className={isLoaderUpdate ? 'spinner' : ''}>
              {isLoaderUpdate ? '' : 'Save'}
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default MealForm;