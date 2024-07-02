
import moment from "moment/moment";

export const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const getPreviousWeekStartDate = () => {
  const today = new Date();
  const previousWeekStartDate = new Date(today.setDate(today.getDate() - today.getDay() - 6));
  return moment(previousWeekStartDate.toLocaleDateString("en-US"));
};

export const getPreviousWeekEndDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the number of days to subtract to get to the start of the previous week
  const daysToSubtract = dayOfWeek === 0 ? 6 + 1 + 1 : dayOfWeek + 1 + 1; // Add 1 for current day and another 1 for Monday

  const previousWeekStartDate = new Date(today.setDate(today.getDate() - daysToSubtract));

  // Ensure the date is the start of the day (midnight)
  previousWeekStartDate.setHours(0, 0, 0, 0);

  return moment(previousWeekStartDate.toLocaleDateString("en-US"));
};

export const getCurrentWeekStartDate = () => {
  const today = new Date();
  const currentWeekStartDate = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7));
  return moment(currentWeekStartDate.toLocaleDateString("en-US"));
};

export const getCurrentWeekEndDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the number of days to add to get to the end of the current week
  const daysToAdd = dayOfWeek === 6 ? 6 : 6 - dayOfWeek - 1; // Subtract 1 for current day

  const currentWeekEndDate = new Date(today.setDate(today.getDate() + daysToAdd));

  // Ensure the date is the end of the day (23:59:59.999)
  currentWeekEndDate.setHours(23, 59, 59, 999);

  return moment(currentWeekEndDate.toLocaleDateString("en-US"));
};

export const getPreviousMonthStartDate = () => {
  const today = new Date();
  const previousMonthStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return moment(previousMonthStartDate.toLocaleDateString("en-US"));
};

export const getPreviousMonthEndDate = () => {
  return moment(new Date()).subtract(1, 'months').endOf('month')
};

export const getCurrentMonthStartDate = () => {
  const today = new Date();
  const currentMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
  return moment(currentMonthStartDate.toLocaleDateString("en-US"));
};

export const getCurrentMonthEndDate = () => {
  return moment().endOf('month');
};


export const makeDate = (date) => {
  if (!date) return '';
  if (typeof date === 'number') {
    try {
      date = date.toDate();
    } catch (error) {
      return ''
    }
  } else if (typeof date === 'string') {
    const timestamp = 'Timestamp(seconds=1715108400, nanoseconds=0)';
    const seconds = parseInt(timestamp.match(/seconds=(\d+)/)[1]);
    const nanoseconds = parseInt(timestamp.match(/nanoseconds=(\d+)/)[1]);
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    date = new Date(milliseconds);

  } else if (typeof date === 'object') {
    if (date?.seconds) {
      date = date.toDate();
    }
  }
  return date;
}
