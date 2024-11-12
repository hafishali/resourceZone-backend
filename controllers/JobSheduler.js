// jobScheduler.js
const cron = require('node-cron');
const Job = require('../models/Job'); 
const moment = require('moment'); 

// Schedule the task to run at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    // Find jobs where the deadline has passed and the status is still true
    const currentDate = moment().format('YYYY-MM-DD');
    const jobsToUpdate = await Job.updateMany(
      { deadline_date: { $lt: currentDate }, status: true },
      { status: false }
    );

    if (jobsToUpdate.nModified > 0) {
      console.log(`Updated ${jobsToUpdate.nModified} jobs to expired status.`);
    }
  } catch (error) {
    console.error('Failed to update expired jobs:', error);
  }
});
