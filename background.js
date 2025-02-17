let timeTrackingData = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;
  chrome.tabs.get(tabId, (tab) => {
    if (!timeTrackingData[tabId]) {
      timeTrackingData[tabId] = { startTime: Date.now(), url: tab.url, activity: { clicks: 0, keypresses: 0 }, timeSpent: 0 };
    }
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (timeTrackingData[tabId]) {
    timeTrackingData[tabId].timeSpent += Date.now() - timeTrackingData[tabId].startTime;
    saveTimeData();
    delete timeTrackingData[tabId];
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && !timeTrackingData[tabId]) {
    timeTrackingData[tabId] = { startTime: Date.now(), url: tab.url, activity: { clicks: 0, keypresses: 0 }, timeSpent: 0 };
  }
});

function saveTimeData() {
  chrome.storage.local.set({ timeTrackingData });
}

function loadTimeData(callback) {
  chrome.storage.local.get("timeTrackingData", (data) => {
    timeTrackingData = data.timeTrackingData || {};
    callback(timeTrackingData);
  });
}

export { saveTimeData, loadTimeData };
