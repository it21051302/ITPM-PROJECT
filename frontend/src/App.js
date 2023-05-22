import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import "./components/updateFood";

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [nutrients, setNutrients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      foodId: foodId,
      foodName: foodName,
      Description: description,
      Nutriants: nutrients,
    };
    axios
      .post("http://localhost:8080/foods/add", data)
      .then((res) => {
        alert(res.data);
        // axios.get("/foods/getAll").then((res) => {
        //   setFoodItems(res.data);
        // });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/foods/getAll")
      .then((res) => {
        console.log(res.data);
        setFoodItems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler =(id) => {
   
    axios
    .delete(`http://localhost:8080/foods/deleteFood/${id}`)
    .then((res) => {
      console.log(res.data);
      alert(res.data.status)
     
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Nutritional Foods</h1>

      <div className="container mb-5">
        <h2>Add Food Items</h2>
        <form onSubmit={handleSubmit}>
          <label for="foodId">Food ID:</label>
          <input
            type="number"
            id="foodId"
            name="foodId"
            required
            onChange={(e) => setFoodId(e.target.value)}
          />

          <label for="foodName">Name:</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            required
            onChange={(e) => setFoodName(e.target.value)}
          />

          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label for="nutrients">Nutrients:</label>
          <textarea
            id="nutrients"
            name="nutrients"
            onChange={(e) => setNutrients(e.target.value)}
          ></textarea>

          <button class="btn btn-primary " type="submit">
            Add Food Item
          </button>
        </form>
      </div>

      <div className="container-fluid mt-5">
        <h2>Food Items</h2>
        <table>
          <thead>
            <tr>
              <th class="text-bg-dark">ID</th>
              <th class="text-bg-dark">Name</th>
              <th class="text-bg-dark">Description</th>
              <th class="text-bg-dark">Nutrients</th>
              <th class="text-bg-dark">Actions</th>
              <th class="text-bg-dark"></th>
            </tr>
          </thead>
          {foodItems.map((item, index) => (
            <tbody id="food-list">
              <th class="mt-3 text-light">{item.foodId}</th>
              <th class="mt-3 text-dark">{item.foodName}</th>
              <th class="mt-3 text-dark">{item.Description}</th>
              <th class="mt-3 text-dark">{item.Nutriants}</th>
              <th><button class="btn btn-danger mr-0" onClick={ () => {deleteHandler(item._id)}}>Delete</button></th>
              <th><button class="btn btn-warning ml-0">Update</button></th>
            </tbody>
          ))}
        </table>
      </div>

      <script src="FoodForm.jsx"></script>
    </div>
  );
}

export default App;
