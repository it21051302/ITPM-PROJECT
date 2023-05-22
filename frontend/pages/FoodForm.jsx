import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [nutrients, setNutrients] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/foods/getAll").then((res) => {
      setFoodItems(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    console.log("Hi");
    console.log(e);
    e.preventDefault();
    axios
      .post("http://localhost:3000/foods/add", { foodId, foodName, description, nutrients })
      .then((res) => {
        console.log(res);
        // axios.get("/foods/getAll").then((res) => {
        //   setFoodItems(res.data);
        // });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`/foods/deleteFood/${id}`).then(() => {
      axios.get("/foods/getAll").then((res) => {
        setFoodItems(res.data);
      });
    });
  };

  return (
    
    <div class="container mb-5">
      
      <form class="mt-5" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Food Id"
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nutrients"
          value={nutrients}
          onChange={(e) => setNutrients(e.target.value)}
        />
        <button type="submit">Add Food Item</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Food Id</th>
            <th>Food Image</th>
            <th>Food Name</th>
            <th>Description</th>
            <th>Nutrients</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item) => (
            <tr key={item.foodId}>
              <td>{item.foodId}</td>
              <td>{item.myfile}</td>
              <td>{item.foodName}</td>
              <td>{item.Description}</td>
              <td>{item.Nutriants}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Food;
