// Example Data for Top 10 Countries by Computing Power (in Petaflops)
const countries = [
    "USA",
    "China",
    "Japan",
    "Germany",
    "UK",
    "India",
    "France",
    "South Korea",
    "Canada",
    "Russia"
  ];
  
  const computingPower = [
    2400, // USA
    2200, // China
    1700, // Japan
    1200, // Germany
    1000, // UK
    850,  // India
    800,  // France
    700,  // South Korea
    600,  // Canada
    500   // Russia
  ];
  
  // Chart Configuration
  const ctx = document.getElementById('computingPowerChart').getContext('2d');
  const computingPowerChart = new Chart(ctx, {
    type: 'bar', // Type of chart
    data: {
      labels: countries, // X-axis labels
      datasets: [{
        label: 'Computing Power (Petaflops)',
        data: computingPower, // Y-axis data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(123, 192, 75, 0.6)',
          'rgba(255, 140, 64, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(123, 192, 75, 1)',
          'rgba(255, 140, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top', // Position of legend
        },
        title: {
          display: true,
          text: 'Top 10 Countries by Computing Power'
        }
      },
      scales: {
        y: {
          beginAtZero: true // Start Y-axis at 0
        }
      }
    }
  });
  