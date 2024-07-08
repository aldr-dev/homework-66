export interface ApiMealForm {
  category: string;
  description: string;
  calories: string;
}

export interface ApiMeal extends ApiMealForm{
  id: string;
}