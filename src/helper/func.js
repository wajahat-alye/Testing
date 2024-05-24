
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
  const previousWeekEndDate = new Date(today.setDate(today.getDate() - today.getDay()));
  return moment(previousWeekEndDate.toLocaleDateString("en-US"));
};

export const getCurrentWeekStartDate = () => {
  const today = new Date();
  const currentWeekStartDate = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7 ));
  return moment(currentWeekStartDate.toLocaleDateString("en-US"));
};

export const getCurrentWeekEndDate = () => {
  const today = new Date();
  const currentWeekEndDate = new Date(today.setDate(today.getDate() - (today.getDay() + 6) % 7 + 6));
  return moment(currentWeekEndDate.toLocaleDateString("en-US"));
};

export const getPreviousMonthStartDate = () => {
  const today = new Date();
  const previousMonthStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  return moment(previousMonthStartDate.toLocaleDateString("en-US"));
};

export const getPreviousMonthEndDate = () => {
  const today = new Date();
  const previousMonthEndDate = new Date(today.getFullYear(), today.getMonth(), 0);
  return moment(previousMonthEndDate.toLocaleDateString("en-US"));
};

export const getCurrentMonthStartDate = () => {
  const today = new Date();
  const currentMonthStartDate =  new Date(today.getFullYear(), today.getMonth(), 1);
  return moment(currentMonthStartDate.toLocaleDateString("en-US"));
};

export const getCurrentMonthEndDate = () => {
  const today = new Date();
  const currentMonthEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // return moment(currentMonthEndDate.toLocaleDateString("en-US")
  return moment(currentMonthEndDate.toLocaleDateString("en-US"))
};


export const makeDate = (date) => {
  if(!date) return '';
  if (typeof date === 'number') {
    try {
      date = date.toDate();
    } catch (error) {
      return ''
    }
  }else if (typeof date === 'string') {
    const timestamp = 'Timestamp(seconds=1715108400, nanoseconds=0)';
const seconds = parseInt(timestamp.match(/seconds=(\d+)/)[1]);
const nanoseconds = parseInt(timestamp.match(/nanoseconds=(\d+)/)[1]);
const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
date = new Date(milliseconds);

  }else if (typeof date === 'object') {
    if(date?.seconds){
      date = date.toDate();
    }
  }
  return date;
}
