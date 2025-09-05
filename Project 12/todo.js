let inputs = document.getElementById("inp");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("timeInput");
let text = document.querySelector(".text");

function Add() {
    if (inputs.value === "" || dateInput.value === "" || timeInput.value === "") {
        alert("Please fill in all fields (task, date, and time)");
    } else {
        let newEle = document.createElement("ul");

        // Get manual date and time values
        const task = inputs.value;
        const date = dateInput.value;
        const time = timeInput.value;

        newEle.innerHTML = `
            ${task}
            <br>
            <small style="color: lightgray;">${date} ${time}</small>
            <i class="fa-solid fa-trash"></i>
        `;

        text.appendChild(newEle);

        // Clear inputs
        inputs.value = "";
        dateInput.value = "";
        timeInput.value = "";

        newEle.querySelector("i").addEventListener("click", function () {
            newEle.remove();
        });
    }
}
