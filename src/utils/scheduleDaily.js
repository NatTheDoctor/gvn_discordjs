const cron = require("node-cron");

const testSchedule = cron.schedule("* * * * * *", function () {
  console.log("running a task every minute");
});

module.exports = { testSchedule };
