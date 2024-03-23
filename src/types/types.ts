type UserDataType = {
  uid: string;
  email: string;
};

type BasicDishInfoType = {
  id: string;
  title: string;
  image: string;
  imageType: string;
};
type DishCardType = {
  direction: "vertical" | "horizontal";
} & BasicDishInfoType;

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
