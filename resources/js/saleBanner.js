function checkForSale() {
    fetch('/api/sale')
      .then(response => response.json())
      .then(data => {
        if (data.active) {
            console.log("YES")
          updateSaleBanner(data.message);
        } else {
            console.log("NOPE")
          hideSaleBanner();
        }
      })
      .catch(error => console.error('Error fetching sale data:', error));
  }
  
  setInterval(checkForSale, 1000);
  
  function updateSaleBanner(message) {
    const saleBanner = document.getElementById('saleBanner');
    saleBanner.textContent = message;
    saleBanner.style.display = 'block';
  }
  
  function hideSaleBanner() {
    const saleBanner = document.getElementById('saleBanner');
    saleBanner.style.display = 'none';
  }