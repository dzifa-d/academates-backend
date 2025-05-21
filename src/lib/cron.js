import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
  .get(process.env.API_URL, (res) => {
    if (res.statusCode === 200)
      console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
});

export default job;

//HOW CRON JOBS WORK
// Cron jobs are scheduled tasks that run at specific intervals. The syntax for cron jobs is as follows:
// How to use cron jobs:
// The 5 fields in the cron job syntax represent:
// - minute (0-59)
// - hour (0-23)
// - day of the month (1-31)
// - month (1-12)
// - day of the week (0-6, 0 is Sunday)
// Some examples of cron job syntax:
// - "0 0 * * *" - Runs every day at midnight
// - "0 12 * * *" - Runs every day at noon
// - "0 0 * * 0" - Runs every Sunday at midnight
// - "0 0 1 * *" - Runs on the first day of every month at midnight
// The */* in the syntax represents "every" for that field. For example, "*/5" in the minute field means "every 5 minutes".