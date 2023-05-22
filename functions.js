// Imports
import { inputField, listOfIngredients } from "./script.js";

export const clearInputField = () => {
    return inputField.value = '';
}

export const addItem = (inputValue) => {
    return listOfIngredients.innerHTML += `<li>${inputValue}</li>`;
    // console.log(`${inputValue} added to the DB`);
}

export const clearIngredientList = () => {
    return listOfIngredients.innerHTML = '';
}