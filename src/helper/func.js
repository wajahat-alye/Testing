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
  



export const getStartWeekDate = (isPrevious=false)=>{
    
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    if(isPrevious){
        const lastDayOfPreviousWeek = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1));
        return firstDayOfPreviousWeek.toISOString().split('T')[0];
    }
    return firstDayOfWeek.toISOString().split('T')[0];
}



export const getEndWeekDate = (isPrevious=false)=>{
    const today = new Date();
    if(isPrevious){
        const firstDayOfPreviousWeek = new Date(lastDayOfPreviousWeek.setDate(lastDayOfPreviousWeek.getDate() - 6));
        return lastDayOfPreviousWeek.toISOString().split('T')[0];
    }
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return lastDayOfWeek.toISOString().split('T')[0];
}
