// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";

// function App() {
//     const [updateFoodId, setUpdateFoodId] = useState("");
//     const [updateFoodName, setUpdateFoodName] = useState("");
//     const [updateDescription, setUpdateDescription] = useState("");
//     const [updateNutrients, setUpdateNutrients] = useState("");
//     const [isUpdateMode, setIsUpdateMode] = useState(false);
//     const [updateItemId, setUpdateItemId] = useState("");
    

//     const handleSubmit = (e) => {
//         e.preventDefault();
      
//         if (isUpdateMode) {
//           const data = {
//             foodId: updateFoodId,
//             foodName: updateFoodName,
//             Description: updateDescription,
//             Nutriants: updateNutrients,
//           };
      
//           axios
//             .put(`http://localhost:8080/foods/update/${updateItemId}`, data)
//             .then((res) => {
//               alert(res.data);
//               setUpdateFoodId("");
//               setUpdateFoodName("");
//               setUpdateDescription("");
//               setUpdateNutrients("");
//               setIsUpdateMode(false);
//               setUpdateItemId("");
//             })
//             .catch((err) => console.log(err));
//         } else {
//           const data = {
//             foodId: foodId,
//             foodName: foodName,
//             Description: description,
//             Nutriants: nutrients,
//           };
      
//           axios
//             .post("http://localhost:8080/foods/add", data)
//             .then((res) => {
//               alert(res.data);
//               setFoodId("");
//               setFoodName("");
//               setDescription("");
//               setNutrients("");
//             })
//             .catch((err) => console.log(err));
//         }
//       };
      

//   return (
//     <div>
//       {/* Update Food Items Form */}
// <div className="container mb-5">
//   <h2>{isUpdateMode ? "Update Food Item" : "Add Food Items"}</h2>
//   <form onSubmit={handleSubmit}>
//     <label htmlFor="foodId">Food ID:</label>
//     <input
//       type="number"
//       id="foodId"
//       name="foodId"
//       required
//       value={isUpdateMode ? updateFoodId : foodId}
//       onChange={(e) =>
//         isUpdateMode ? setUpdateFoodId(e.target.value) : setFoodId(e.target.value)
//       }
//     />

//     <label htmlFor="foodName">Name:</label>
//     <input
//       type="text"
//       id="foodName"
//       name="foodName"
//       required
//       value={isUpdateMode ? updateFoodName : foodName}
//       onChange={(e) =>
//         isUpdateMode ? setUpdateFoodName(e.target.value) : setFoodName(e.target.value)
//       }
//     />

//     <label htmlFor="description">Description:</label>
//     <textarea
//       id="description"
//       name="description"
//       value={isUpdateMode ? updateDescription : description}
//       onChange={(e) =>
//         isUpdateMode
//           ? setUpdateDescription(e.target.value)
//           : setDescription(e.target.value)
//       }
//     ></textarea>

//     <label htmlFor="nutrients">Nutrients:</label>
//     <textarea
//       id="nutrients"
//       name="nutrients"
//       value={isUpdateMode ? updateNutrients : nutrients}
//       onChange={(e) =>
//         isUpdateMode ? setUpdateNutrients(e.target.value) : setNutrients(e.target.value)
//       }
//     ></textarea>

//     <button className="btn btn-primary" type="submit">
//       {isUpdateMode ? "Update Food Item" : "Add Food Item"}
//     </button>
//   </form>
// </div>

// {foodItems.map((item, index) => (
//   <tbody id="food-list" key={index}>
//     <tr>
//       <td className="mt-3 text-light">{item.foodId}</td>
//       <td className="mt-3 text-dark">{item.foodName}</td>
//       <td className="mt-3 text-dark">{item.Description}</td>
//       <td className="mt-3 text-dark">{item.Nutriants}</td>
//       <td>
//         <button
//           className="btn btn-danger"
//           onClick={() => {
//             deleteHandler(item._id);
//           }}
//         >
//           Delete
//         </button>
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setIsUpdateMode(true);
//             setUpdateItemId(item._id);
//             setUpdateFoodId(item.foodId);
//             setUpdateFoodName(item.foodName);
//             setUpdateDescription(item.Description);
//             setUpdateNutrients(item.Nutriants);
//           }}
//         >
//           Edit
//         </button>
//       </td>
//     </tr>
//   </tbody>
// ))}

//     </div>
//   );
// }

// export default App;
