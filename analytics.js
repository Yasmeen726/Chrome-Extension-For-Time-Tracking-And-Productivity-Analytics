function calculateProductivity(timeSpent, activityData) {
    const activityScore = activityData.clicks + activityData.keypresses;
    const timeFactor = timeSpent / 60; // Time in minutes
    const productivityScore = (activityScore / timeFactor) * 100;
    
    return {
      productivityScore,
      activityScore,
      timeFactor,
    };
  }
  
  function generateReport(timeTrackingData) {
    let report = "";
    
    for (let tabId in timeTrackingData) {
      const data = timeTrackingData[tabId];
      const productivity = calculateProductivity(data.timeSpent, data.activity);
      
      report += `Website: ${data.url}\n`;
      report += `Time Spent: ${Math.round(data.timeSpent / 1000)} seconds\n`;
      report += `Productivity Score: ${Math.round(productivity.productivityScore)}\n\n`;
    }
    
    return report;
  }
  
  export { generateReport, calculateProductivity };
