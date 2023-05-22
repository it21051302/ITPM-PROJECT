import React, { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
 
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [nutrients, setNutrients] = useState("");

  useEffect(() => {
    axios.get("/foods/getAll").then((res) => {
      Food(res.data);
    });
  }, []);

  const handleSubmit = () => {
   
    alert("hi")
    // axios
    //   .post("http://localhost:8080/foods/add", { foodId,foodName, description, nutrients })
    //   .then(() => {
    //     axios.get("http://localhost:8080/foods/getAll").then((res) => {
    //       Food(res.data);
    //     });
    //   })
    //   .catch((err) => console.log(foodId));
  };

  const handleDelete = (id) => {
    axios.delete(`/foods/deleteFood/${id}`).then(() => {
      axios.get("/foods/getAll").then((res) => {
        setFoodItems(res.data);
      });
    });
  };

  return (
    <div>
      {/* <form > */}
      
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
        <button onClick={handleSubmit}>Add Food Item</button>
      {/* </form> */}
      <table>
        <thead>
          <tr>
            <th>Food Id</th>
            <th>Food Name</th>
            <th>Description</th>
            <th>Nutrients</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.foodId}>
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
