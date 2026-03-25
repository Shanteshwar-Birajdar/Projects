const apiKey = "YOUR_API_KEY_HERE";

// Celsius to Fahrenheit
function convertToFahrenheit() {
    const temp = document.getElementById("tempInput").value;

    if (temp === "") {
        alert("Please enter temperature");
        return;
    }

    const fahrenheit = (temp * 9/5) + 32;
    document.getElementById("result").innerText =
        `${temp} °C = ${fahrenheit.toFixed(2)} °F`;
}

// Fahrenheit to Celsius
function convertToCelsius() {
    const temp = document.getElementById("tempInput").value;

    if (temp === "") {
        alert("Please enter temperature");
        return;
    }

    const celsius = (temp - 32) * 5/9;
    document.getElementById("result").innerText =
        `${temp} °F = ${celsius.toFixed(2)} °C`;
}

// Get temperature by city
function getCityTemperature() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("result").innerText = "City not found";
                return;
            }

            const temp = data.main.temp;
            document.getElementById("result").innerText =
                `Current temperature in ${city} is ${temp} °C`;
        })
        .catch(() => {
            document.getElementById("result").innerText =
                "Error fetching temperature";
        });
}
