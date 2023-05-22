// define API URL
const apiUrl = 'http://localhost:8081/foods';

// retrieve food item list from API and display on page load
window.onload = () => {
  getFoodItems();
};

// handle form submission to add a new food item
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const foodId = document.getElementById('foodId').value;
  const foodName = document.getElementById('foodName').value;
  const description = document.getElementById('description').value;
  const nutrients = document.getElementById('nutrients').value;

  addFoodItem(foodId, foodName, description, nutrients);
});

// retrieve the list of food items from the API and display on the page
function getFoodItems() {
  fetch(apiUrl)
.then(response => response.json())
.then(foods => {
  const foodList = document.getElementById('food-list');
  foodList.innerHTML = '';
  
  foods.forEach(food => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${food.foodId}</td>
      <td>${food.foodName}</td>
      <td>${food.description}</td>
      <td>${food.nutrients}</td>
      <td class="actions">
        <button onclick="editFoodItem(${food.foodId})">Edit</button>
        <button onclick="deleteFoodItem(${food.foodId})">Delete</button>
      </td>
    `;
    foodList.appendChild(row);
  });
})
.catch(error => console.error(error));
}

// add a new food item to the API and display it on the page
function addFoodItem(foodId, foodName, description, nutrients) {
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({foodId, foodName, description, nutrients})
})
.then(response => response.json())
.then(() => {
  // clear form and display updated list of food items
  document.getElementById('foodId').value = '';
  document.getElementById('foodName').value = '';
  document.getElementById('description').value = '';
  document.getElementById('nutrients').value = '';
  getFoodItems();
})
.catch(error => console.error(error));
}

// retrieve the details of a single food item from the API and pre-populate the form for editing
function editFoodItem(foodId) {
fetch(`${apiUrl}/${foodId}`)
.then(response => response.json())
.then(food => {
  document.getElementById('foodId').value = food.foodId;
  document.getElementById('foodName').value = food.foodName;
  document.getElementById('description').value = food.description;
  document.getElementById('nutrients').value = food.nutrients;

  // change submit button to update button
  const submitButton = document.querySelector('form button[type="submit"]');
  submitButton.textContent = 'Update Food Item';
  submitButton.onclick = () => {
    updateFoodItem(foodId, document.getElementById('foodName').value, document.getElementById('description').value, document.getElementById('nutrients').value);
  };
})
.catch(error => console.error(error));
}

// update an existing food item in the API and display the updated list of food items
function updateFoodItem(foodId, foodName, description, nutrients) {
fetch(`${apiUrl}/${foodId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({foodId, foodName, description, nutrients})
})
.then(response => response.json())
.then(() => {
  // reset form and display updated list of food items
  document.getElementById('foodId').value = '';
  document.getElementById('foodName').value = '';
  document.getElementById('description').value = '';
  document.getElementById('nutrients').value = '';
  const submitButton = document.querySelector('form button[type="submit"]');
  submitButton.textContent = 'Add Food Item';
  submitButton.onclick = addFoodItem;
  getFoodItems();
})
.catch(error => console.error(error));
}

// delete a food item from the API and display the updated list of food items
function deleteFoodItem(foodId) {
fetch(`${apiUrl}/${foodId}`, {
  method: 'DELETE'
})
.then(() => {
  getFoodItems();
})
.catch(error => console.error(error));
}
