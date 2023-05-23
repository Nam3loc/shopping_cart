// Imports
import { inputField, listOfIngredients, database } from "./script.js";
import { ref, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

export const clearInputField = () => {
    return inputField.value = '';
}

export const addItem = (currentIngredient) => {
    let itemID = currentIngredient[0];
    let itemName = currentIngredient[1];
    
    let newListElement = document.createElement('li');
    newListElement.textContent = itemName;
    listOfIngredients.append(newListElement);

    newListElement.addEventListener('click', (evt) => {
        // console.log('test', itemID);
        let exactLocationInDB = ref(database, `ingredients/${itemID}`)
        // console.log('test location', exactLocationInDB);
        remove(exactLocationInDB);
    })
}

export const clearIngredientList = () => {
    return listOfIngredients.innerHTML = '';
}

// export const deleteIngredient = (currentIngredient, evt) => {
//     let itemID = currentIngredient[0];
//     let itemName = currentIngredient[1];

//     console.log('test id', itemID);
//     console.log('test name', itemName);
//     let exactLocationInDB = ref(database, `ingredients/${itemID}`)
//     console.log('test location', exactLocationInDB);

//     evt.target.addEventListener('dblclick', (evt) => {
//         console.log('test', itemID);
//         let exactLocationInDB = ref(database, `ingredients/${itemID}`)
//         console.log('test location', exactLocationInDB);
//         remove(exactLocationInDB);
//     })
// }