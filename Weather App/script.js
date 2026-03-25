async function getWeather() {
  let city = document.getElementById("city").value;

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  let apiKey = "YOUR_API_KEY"; // replace with your key
  let url = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerText = "City not found!";
      return;
    }

    let result = `
      Temperature: ${data.main.temp} °C <br>
      Weather: ${data.weather[0].main} <br>
      Humidity: ${data.main.humidity}%
    `;

    document.getElementById("weatherResult").innerHTML = result;

  } catch (error) {
    console.log(error);
  }
}