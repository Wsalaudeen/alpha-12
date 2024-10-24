export {
  createMonthlyChart,
  imageSlider,
  handleSearch,
  handleSort,
  handleRow,
} from "./monthlychart";

// function to handle keyboard navigation
export function handleKeyboardNavigation(e) {
  const navItems = document.querySelectorAll(".nav-item");
  let currentIndex = Array.from(navItems).indexOf(document.activeElement);

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      currentIndex = (currentIndex + 1) % navItems.length;
      navItems[currentIndex].focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[currentIndex].focus();
      break;
    case "ArrowRight":
      // No sub-menu ArrowLeft acts like ArrowDown, moving to the next item.
      e.preventDefault();
      currentIndex = (currentIndex + 1) % navItems.length;
      navItems[currentIndex].focus();
      break;
    case "ArrowLeft":
      // No sub-menu ArrowLeft behaves like ArrowUp, moving focus to the previous item.
      e.preventDefault();
      currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[currentIndex].focus();
      break;

    case "Escape":
      e.preventDefault();
      document.activeElement.blur();
      break;
    case "Tab":
      break;
    default:
      break;
  }
}

//  Event listener to the navigation
export function updateFocus() {
  const navContainer = document.querySelector(".navigation");
  navContainer.addEventListener("keydown", handleKeyboardNavigation);
}

// funtion to handle sidebar functionality

export function handleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.getElementById("collapse-btn");
  const navItems = document.querySelectorAll(".nav-item");
  const logo = document.querySelector(".logo");
  const notificationBadge = document.querySelector(".notification-badge");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const userProfile = document.querySelector(".user-profile");

  if (
    !collapseBtn ||
    !navItems.length ||
    !logo ||
    !notificationBadge ||
    !darkModeToggle ||
    !userProfile
  ) {
    console.error("One or more necessary elements not found.");
    return; // Exit if any required elements are not found
  }

  collapseBtn.addEventListener("click", () => {
    toggleSidebar(
      sidebar,
      navItems,
      logo,
      notificationBadge,
      darkModeToggle,
      userProfile
    );

    toggleCollapseIcon(sidebar);
  });
}

function toggleSidebar(
  sidebar,
  navItems,
  logo,
  notificationBadge,
  darkModeToggle,
  userProfile
) {
  sidebar.classList.toggle("collapsed");

  updateIcons(sidebar, navItems);
  toggleLogo(sidebar, logo);
  toggleNotificationBadge(sidebar, notificationBadge);
  toggleDarkModeToggle(sidebar, darkModeToggle);
  toggleUserProfile(sidebar, userProfile);
}

function toggleCollapseIcon(sidebar) {
  const collapseBtn = document.querySelector("#collapse-btn");
  const expandedIcon = collapseBtn.querySelector(".expanded-icon");
  const collapsedIcon = collapseBtn.querySelector(".collapsed-icon");
  const collapseText = collapseBtn.querySelector(".nav-text");

  if (collapseBtn && expandedIcon && collapsedIcon && collapseText) {
    if (sidebar.classList.contains("collapsed")) {
      expandedIcon.style.display = "none";
      collapsedIcon.style.display = "inline-block";
      collapseText.style.display = "none"; // Hide collapse text
    } else {
      expandedIcon.style.display = "inline-block";
      collapsedIcon.style.display = "none";
      collapseText.style.display = "inline-block"; // Show collapse text
    }
  } else {
    console.error("Collapse button or icons not found");
  }
}

function toggleLogo(sidebar, logo) {
  if (logo) {
    logo.style.display = sidebar.classList.contains("collapsed")
      ? "none"
      : "block";
  } else {
    console.error("logo element not found");
  }
}

function toggleNotificationBadge(sidebar, notificationBadge) {
  if (notificationBadge) {
    notificationBadge.style.display = sidebar.classList.contains("collapsed")
      ? "none"
      : "block";
  } else {
    console.error("notification not found");
  }
}

function toggleDarkModeToggle(sidebar, darkModeToggle) {
  if (darkModeToggle) {
    darkModeToggle.style.display = sidebar.classList.contains("collapsed")
      ? "none"
      : "block";
  } else {
    console.error("dark mode element element not found");
  }
}

function toggleUserProfile(sidebar, userProfile) {
  if (userProfile) {
    userProfile.style.display = sidebar.classList.contains("collapsed")
      ? "none"
      : "block";
  } else {
    console.error("user profile element not found");
  }
}
function updateIcons(sidebar, navItems) {
  navItems.forEach((navItem) => {
    const expandedIcon = navItem.querySelector(".expanded-icon");
    const collapsedIcon = navItem.querySelector(".collapsed-icon");
    const textElement = navItem.querySelector(".nav-text"); // Adjust this selector if needed

    // Check if icons and text exist before trying to access their style properties
    if (expandedIcon && collapsedIcon && textElement) {
      if (sidebar.classList.contains("collapsed")) {
        expandedIcon.style.display = "none";
        collapsedIcon.style.display = "inline-block";
        textElement.style.display = "none";
      } else {
        expandedIcon.style.display = "inline-block";
        collapsedIcon.style.display = "none";
        textElement.style.display = "inline-block";
      }
    } else {
      console.error(
        "One or more elements (expandedIcon, collapsedIcon, or textElement) are missing in navItem",
        navItem
      );
    }
  });
}

// Function to reset the sidebar to the expanded state
function resetSidebar(sidebar, navItems) {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    updateIcons(sidebar, navItems);
  }
}

document.querySelectorAll(".collapsed-icon").forEach((icon) => {
  icon.addEventListener("click", () =>
    resetSidebar(
      document.getElementById("sidebar"),
      document.querySelectorAll(".nav-item")
    )
  );
});
