// src/pages/WeeklyMealPlan.jsx
import React, { useState } from 'react';

const mealPlan = {
  '05 May': {
    tag: 'High-Protein, gluten-free',
    color: 'bg-orange-200',
    meals: [
      { type: 'Breakfast', name: 'Egg & Cottage Cheese Scramble' },
      { type: 'Lunch', name: 'Turkey & Black Bean Chili' },
      { type: 'Dinner', name: 'Shrimp & Edamame Stir-Fry' },
    ],
  },
  '06 May': {
    tag: 'High-Protein, gluten-free',
    color: 'bg-green-200',
    meals: [
      { type: 'Breakfast', name: 'Greek Yogurt & Almond Smoothie' },
      { type: 'Lunch', name: 'Beef & Sweet Potato Skillet' },
      { type: 'Dinner', name: 'Lentil & Chickpea Stew' },
    ],
  },
  '07 May': {
    tag: 'High-Protein, gluten-free',
    color: 'bg-pink-200',
    meals: [
      { type: 'Breakfast', name: 'Grilled Chicken & Quinoa Bowl' },
      { type: 'Lunch', name: 'Salmon & Avocado Salad' },
    ],
  },
};

const mockRecipes = [
  {
    name: 'Egg & Avocado Toast',
    ingredients: ['egg', 'avocado', 'bread'],
    steps: [
      'Toast the bread.',
      'Fry or boil the egg.',
      'Mash avocado and spread on toast.',
      'Top with sliced egg and season.',
    ],
  },
  {
    name: 'Simple Fried Rice',
    ingredients: ['rice', 'egg', 'vegetables'],
    steps: [
      'Cook rice and let it cool.',
      'Scramble eggs in a pan.',
      'Add chopped veggies and sauté.',
      'Mix in rice and stir-fry everything.',
    ],
  },
];

export default function WeeklyMealPlan() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const ingredients = input.toLowerCase().split(',').map((i) => i.trim());
    const filtered = mockRecipes.filter((recipe) =>
      recipe.ingredients.every((item) => ingredients.includes(item))
    );
    setResults(filtered);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Weekly meal plan</h2>
      <p className="text-gray-600">Customize the menu settings to suit your taste.</p>

      {/* Daily Meal Cards */}
      {Object.entries(mealPlan).map(([date, details]) => (
        <div key={date} className={`p-4 rounded-xl ${details.color}`}>
          <h3 className="font-semibold text-lg">{date}</h3>
          <p className="text-sm text-gray-700 mb-2">{details.tag}</p>
          {details.meals.map((meal, idx) => (
            <div key={idx} className="mb-1">
              <strong>{meal.type}: </strong>
              <span>{meal.name}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Control Buttons */}
      <div className="flex justify-between gap-4">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Edit menu settings
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
          Generate new plan
        </button>
      </div>

      {/* Ingredient Search Feature */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Got ingredients? Find recipes:</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. egg, avocado, bread"
          className="w-full p-2 border rounded-lg mb-3"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500"
        >
          Find Recipes
        </button>

        {/* Recipe Results */}
        {results.length > 0 && (
          <div className="mt-4 space-y-4">
            <h4 className="text-md font-bold">Recipes You Can Make:</h4>
            {results.map((recipe, index) => (
              <div key={index} className="p-4 bg-white rounded-xl shadow-md">
                <h5 className="text-lg font-semibold">{recipe.name}</h5>
                <ul className="list-decimal list-inside mt-2 space-y-1 text-sm text-gray-700">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && input && (
          <p className="text-sm text-red-500 mt-3">No recipes found with those ingredients.</p>
        )}
      </div>
    </div>
  );
}
