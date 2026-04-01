async function getWeather() {
  const city = document.getElementById("city").value;

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  try {
    // Step 1: Convert city to latitude & longitude
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      alert("City not found");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Step 2: Fetch weather using lat & long
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    document.getElementById("weather-result").classList.remove("hidden");

    document.getElementById("city-name").innerText = name;
    document.getElementById("temp").innerText = `Temperature: ${weatherData.current.temperature_2m}°C`;
    document.getElementById("desc").innerText = `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;
    document.getElementById("humidity").innerText = `Data from Open-Meteo`;

  } catch (error) {
    console.log(error);
    alert("Error fetching data");
  }
}