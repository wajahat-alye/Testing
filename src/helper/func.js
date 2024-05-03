export const makeDate = (date) => {
    if (date?.seconds) {
      return date.toDate();
    }
    return date;
  }


  export const generateRandomId = () => {
    const randomId = Math.random().toString(36).substr(2, 6);
    return randomId;
  };
  