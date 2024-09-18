export type ErrorMsg = {
  status: number | null;
  msg: string | null;
}

export type AssistantResponse = {
  success: boolean;
  video_url: string;
  recipe: {
    name: string;
    description: string;
    cooking_time: string;
    categories: (
      | "Cakes"
      | "Pastry"
      | "Dessert"
      | "Breakfast"
      | "Lunch"
      | "Dinner"
      | "Pies"
      | "Sweet"
      | "Biscuits"
      | "Ice Cream"
      | "Beverage"
      | "Alcohol"
      | "Soups"
      | "Burgers"
      | "Candy"
      | "Bread"
      | "Fruit"
      | "Vegetable"
      | "Protein"
      | "Pasta"
      | "Smoothie"
      | "Stews"
      | "Slow Cook"
      | "BBQ"
      | "Salad"
      | "Muffins"
      | "Roasts"
      | "Gluten-Free"
      | "Dairy-Free"
      | "Nut-Free"
      | "Vegan"
      | "Vegetarian"
      | "Carnivore"
      | "Chicken"
      | "Red Meat"
      | "Rice"
      | "Pork"
      | "Poultry"
      | "Seafood"
      | "Air-Fry"
      | "Snacks"
      | "Pizzas"
    )[]; // An array containing exactly 2 categories from the predefined list
    ingredients: string[]; // List of ingredients, also includes measurements (e.g., '2 eggs')
    instructions: string[]; // List of instructions
  };
};