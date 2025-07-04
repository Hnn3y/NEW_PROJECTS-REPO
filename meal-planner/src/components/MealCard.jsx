const MealCard = ({ date, details, onEdit }) => (
  <div className={`p-4 rounded-xl ${details.color}`}>
    <h3 className="font-semibold text-lg flex justify-between items-center">
      {date}
      <button
        className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        onClick={() => onEdit(date)}
      >
        Edit
      </button>
    </h3>
    <p className="text-sm text-gray-700 mb-2">{details.tag}</p>
    {details.meals.map((meal, idx) => (
      <div key={idx} className="mb-1">
        <strong>{meal.type}:</strong> <span>{meal.name}</span>
      </div>
    ))}
  </div>
);
export default MealCard;
