import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiMeal, ApiMealForm} from '../../types';
import {toast} from 'react-toastify';
import Preloader from '../Preloader/Preloader';
import './MealForm.css';

const MealForm = () => {
  const {id} = useParams();
  const [data, setData] = useState<ApiMealForm>({
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
            toast.error('An error has occurred. Failed to process information.');
            throw new Error('An error has occurred. Failed to process information. ' + response.status);
          }

          if (response.data !== null) {
            setData((prevState) => {
              return {
                ...prevState,
                category: response.data.category,
                description: response.data.description,
                calories: response.data.calories,
              };
            });
          }
        } catch (error) {
          setIsLoaderGet(false);
          toast.error('An error has occurred. Failed to process information.');
          console.error('An error has occurred. Failed to process information. ' + error);
        }
      };
      void data();
    }
  }, [id]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.calories.length !== 0 && data.description.length !== 0 && data.calories.length !== 0) {
      try {
        setIsLoaderUpdate(true);
        let response;
        if (id) {
          response = await axiosApi.put<ApiMealForm>(`/meals/${id}.json`, data);
          toast.success('Meal data was successfully updated.');
        } else {
          setData({category: '', description: '', calories: '',});
          response = await axiosApi.post<ApiMealForm>('/meals.json', data);
          navigate('/');
          toast.success('Food data has been added successfully.');
        }
        setIsLoaderUpdate(false);

        if (response.status !== 200) {
          toast.error('An error has occurred. Failed to process information.');
          throw new Error('An error has occurred. Failed to process information. ' + response.status);
        }

      } catch (error) {
        setIsLoaderUpdate(false);
        toast.error('An error has occurred. Failed to process information.');
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
            value={data.category}
            className="form-select"
            name="category"
            required>
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Snack">Snack</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <label htmlFor="description">Meal Description:</label>
          <textarea
            onChange={onFieldChange}
            id="description"
            value={data.description}
            className="form-description"
            name="description"
            placeholder="Meal Description"
            required>
          </textarea>
          <label htmlFor="calories">Calories:</label>
          <input
            onChange={onFieldChange}
            id="calories"
            value={data.calories}
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