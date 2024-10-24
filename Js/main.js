import {
  updateFocus,
  handleSidebar,
  createMonthlyChart,
  imageSlider,
  handleSearch,
  handleSort,
  handleRow,
} from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  updateFocus();
});

document.addEventListener("DOMContentLoaded", handleSidebar);

document.addEventListener("DOMContentLoaded", () => {
  createMonthlyChart();
});

document.addEventListener("DOMContentLoaded", imageSlider);
document.addEventListener("DOMContentLoaded", handleSearch);
document.addEventListener("DOMContentLoaded", handleSort);
document.addEventListener("DOMContentLoaded", handleRow);
