import { generateReport } from "../analytics/analytics.js";
import { loadTimeData } from "../background/background.js";

document.addEventListener("DOMContentLoaded", () => {
  loadAnalytics();

  document.getElementById("generate-report").addEventListener("click", () => {
    loadTimeData((timeTrackingData) => {
      const report = generateReport(timeTrackingData);
      alert(report);
    });
  });
});

function loadAnalytics() {
  loadTimeData((timeTrackingData) => {
    let timeHTML = "<h3>Time Spent</h3>";
    let activityHTML = "<h3>Activity Summary</h3>";

    for (const tabId in timeTrackingData) {
      const tab = timeTrackingData[tabId];
      timeHTML += `<p>${tab.url}: ${Math.round(tab.timeSpent / 1000)} seconds</p>`;
      activityHTML += `<p>Activity on ${tab.url}: ${tab.activity.clicks} clicks, ${tab.activity.keypresses} keypresses</p>`;
    }

    document.getElementById("time-tracked").innerHTML = timeHTML;
    document.getElementById("activity-summary").innerHTML = activityHTML;
  });
}
