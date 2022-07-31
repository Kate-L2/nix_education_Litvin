// Task 1
const citiesAndCountries = {
  Киев: "Украина",
  "Нью-Йорк": "США",
  Амстердам: "Нидерланды",
  Берлин: "Германия",
  Париж: "Франция",
  Лиссабон: "Португалия",
  Вена: "Австрия",
};
result = [];
for (const [key, value] of Object.entries(citiesAndCountries)) {
  result.push(`${key} - це ${value}`);
}
console.log(result);

// Task 2
function getArray() {
    let amount = prompt('Input amount: ', "amount")
    if(amount % 3 == 0) {
        let array = [];
        for (let i = 0; i < amount; i++) {
            array[i] = [];
            for (let j = 0; j < 3; j++) {
                array[i][j] = j;
            }
        }
        console.log(array);
    }
    else {
        alert("Input amount which is multiple of three")
    }
}

getArray();

// Task 3
// const namesOfDays = {
//     ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
//     en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
// }
// function getNameOfDay(){
//     const lang = 'en';
//     const day = 5;
//     namesOfDays.en.length = day;
//     namesOfDays.ru.length = day;
//     let output;
//     if(lang == 'en') {
//         output = namesOfDays.en.find(item => namesOfDays.en.length-1);
//     }
//     if(lang == 'ru') {
//         output = namesOfDays.ru.find(item => namesOfDays.ru.length-1);
//     }
//     console.log(output);
// }

// getNameOfDay() 
