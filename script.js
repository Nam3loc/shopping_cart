// Imports

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { clearInputField, addItem, clearIngredientList, clearErrorMessage } from './functions.js';

// Defining elements

const pageContainer = document.getElementById('page-container');
export const inputField = document.getElementById('input-field');
const addToCartButton = document.getElementById('add-to-cart-button');
export const listOfIngredients = document.getElementById('shopping-list');
export let errorMessage = document.createElement('p');

// App Setup

const appSettings = {
    databaseURL: "https://shopping-cart-2bc6e-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
export const database = getDatabase(app);
const ingredientsInDB = ref(database, 'ingredients')

// Database fetch function
onValue(ingredientsInDB, function (snapshot) {
    if (snapshot.exists()) {
        let ingredientsArray = Object.entries(snapshot.val());
        // let ingredientsID = Object.keys(snapshot.val());

        // Clear list so that there are no duplicates
        clearIngredientList();

        for (let i = 0; i < ingredientsArray.length; i++) {
            let currentIngredient = ingredientsArray[i];
            let currentIngredientID = currentIngredient[0];
            let currentIngredientName = currentIngredient[1];
            // console.log('current id: ', currentIngredientID);
            // console.log('current title: ', currentIngredientName);

            addItem(currentIngredient);
            // deleteIngredient(currentIngredient);
        }
    } else {
        listOfIngredients.innerHTML = 'Cart is empty! Add some ingredients for your next trip.';
    }
})

// Event Listeners

addToCartButton.addEventListener('click', (evt) => {
    const inputValue = inputField.value;
    if (inputValue.length > 0) {
        push(ingredientsInDB, inputValue);

        clearInputField();
        clearErrorMessage();
    } else {
        errorMessage.innerHTML = 'Add an ingredient';
        pageContainer.append(errorMessage);
    }
})

inputField.addEventListener('keypress', (evt) => {
    if(evt.key === "Enter") {
        evt.preventDefault();
        
        addToCartButton.click();
    }
})

// https://console.firebase.google.com/u/0/project/shopping-cart-2bc6e/database/shopping-cart-2bc6e-default-rtdb/data
// https://www.youtube.com/watch?v=UFD4SP91tSM
// 1:24:50