// Object to track user activity
let activityData = { clicks: 0, keypresses: 0 };

// Track mouse clicks
document.addEventListener("click", () => {
  activityData.clicks++;
});

// Track keypresses
document.addEventListener("keydown", () => {
  activityData.keypresses++;
});

// Send activity data to background when the tab is closed
window.addEventListener("beforeunload", () => {
  chrome.runtime.sendMessage({ type: "saveActivity", data: activityData });
});
