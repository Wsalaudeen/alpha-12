import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

// Register the required components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

export function createMonthlyChart() {
  // Using the specific ID 'monthly-chart'
  const ctx = document.getElementById("monthly-chart").getContext("2d");

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Values",
        data: [650, 950, 780, 420, 1000, 580, 850, 350, 850, 680, 950, 600],
        backgroundColor: "rgba(133, 118, 255, 1)",
        borderColor: "rgba(115, 103, 240, 1)",
        borderWidth: 1,
        borderRadius: 1,
        barThickness: "flex",
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawTicks: false,
            color: "#64748b",
            drawOnChartArea: true,
          },
          ticks: {
            stepSize: 200,
            color: "#64748b",
          },

          border: {
            display: false,
            dash: [3, 8],
          },
        },
        x: {
          grid: {
            drawTicks: false,
            color: "#64748b",
            drawOnChartArea: true,
          },

          ticks: {
            stepSize: 200,
            color: "#64748b",
          },

          border: {
            display: false,
            dash: [3, 8],
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          cornerRadius: 4,
          displayColors: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuart",
      },
    },
  };

  return new Chart(ctx, config);
}

function updateChartColors(isDarkMode) {
  const xAxisColor = isDarkMode ? "#64748b" : "#fffff";
  const yAxisColor = isDarkMode ? "#64748b" : "#fffff";
  const gridColor = isDarkMode ? "#64748b" : "#fffff";

  createMonthlyChart.options.scales.x.ticks.color = xAxisColor;
  createMonthlyChart.options.scales.y.ticks.color = yAxisColor;
  createMonthlyChart.options.scales.x.grid.color = gridColor;
  createMonthlyChart.options.scales.y.grid.color = gridColor;

  createMonthlyChart.update();
}

export function imageSlider() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const dotsContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const totalSlides = slides.length;

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Event listeners
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // Optional: Auto-play
  let interval = setInterval(nextSlide, 5000);

  // Pause auto-play on hover
  slider.addEventListener("mouseenter", () => clearInterval(interval));
  slider.addEventListener("mouseleave", () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  });

  // Optional: Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
}

export function handleSearch() {
  const searchInput = document.querySelector(".search-box input");
  const tableRows = document.querySelectorAll("tbody tr");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });
}

export function handleSort() {
  const headers = document.querySelectorAll("th");
  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      const rows = Array.from(tableRows);
      const isAscending = header.classList.contains("ascending");

      rows.sort((a, b) => {
        const aValue = a.children[index].textContent;
        const bValue = b.children[index].textContent;
        return isAscending
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      });

      headers.forEach((h) => h.classList.remove("ascending", "descending"));
      header.classList.toggle("ascending", !isAscending);
      header.classList.toggle("descending", isAscending);

      const tbody = document.querySelector("tbody");
      rows.forEach((row) => tbody.appendChild(row));
    });
  });
}
