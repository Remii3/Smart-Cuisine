type UserDataType = {
  uid: string;
  email: string;
};

type DishCardType = {
  id: string;
  title: string;
  image: string;
  imageType: string;
};

type DishType = {
  id: string;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  analyzedInstructions: any;
  extendedIngredients: any;
  instructions: string;
};
