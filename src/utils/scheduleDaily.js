const cron = require("node-cron");
const { setDaily, fetchAllDailyUser } = require("../queries/userQuery");

const scheduleDaily = cron.schedule("* * * * *", async function () {
  let members = await fetchAllDailyUser();
  for (x in members) {
    if (members[x].isDaily) {
      await setDaily(members[x].userId, false);
    }
  }
});

module.exports = { scheduleDaily };
