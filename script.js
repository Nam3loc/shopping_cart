// Imports

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { clearInputField, addItem, clearIngredientList } from './functions.js';

// Defining elements

export const inputField = document.getElementById('input-field');
const addToCartButton = document.getElementById('add-to-cart-button');
export const listOfIngredients = document.getElementById('shopping-list');

// App Setup

const appSettings = {
    databaseURL: "https://shopping-cart-2bc6e-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const ingredientsInDB = ref(database, 'ingredients')

// Database fetch function
onValue(ingredientsInDB, function(snapshot) {
    let ingredientsArray = Object.values(snapshot.val());

    // Clear list so that there are no duplicates
    clearIngredientList();

    for(let i = 0; i < ingredientsArray.length; i++) {
        let currentIngredient = ingredientsArray[i];

        addItem(currentIngredient);
    }
})

// Event Listeners

addToCartButton.addEventListener('click', (evt) => {
    const inputValue = inputField.value;

    push(ingredientsInDB, inputValue);

    clearInputField();
    // addItem(inputValue);
})

// https://www.youtube.com/watch?v=UFD4SP91tSM
// 54:15
// https://console.firebase.google.com/u/0/project/shopping-cart-2bc6e/database/shopping-cart-2bc6e-default-rtdb/data