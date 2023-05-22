import React, { useEffect, useState } from "react";

function FoodList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("/foods/getAll")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const handleEdit = (id) => {
    // handle edit button click
  };

  const handleDelete = (id) => {
    // handle delete button click
  };

  return (
    <div>
      <h2>Food List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Nutrients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.foodId}</td>
              <td>{food.foodName}</td>
              <td>{food.Description}</td>
              <td>{food.Nutriants}</td>
              <td>
                <button onClick={() => handleEdit(food._id)}>Edit</button>
                <button onClick={() => handleDelete(food._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
