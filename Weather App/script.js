document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const apiKey = '82e996c474c47818b1070c70560f1710';
    const city = document.getElementById('city').value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'City not found');
                });
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            
            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').src = iconUrl;
            
            document.getElementById('weather-info').style.display = 'block';
            document.getElementById('error-message').textContent = '';
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message;
            document.getElementById('weather-info').style.display = 'none';
        });
});
