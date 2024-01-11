const monthTextDictionary = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};

export const formatter = (obj) => {
    const startTimestampInMilliseconds = obj.startTimestamp.seconds * 1000;
    const endTimestampInMilliseconds = obj.endTimestamp.seconds * 1000;

    const dateObject = new Date(startTimestampInMilliseconds);
    const endDateObject = new Date(endTimestampInMilliseconds);

    // D: Hours are converted to 12 hour format
    const startMeridiem = dateObject.getHours() < 12? "am" : "pm";
    const endMeridiem = endDateObject.getHours() < 12? "am" : "pm";

    const date = {date: `${monthTextDictionary[dateObject.getMonth() + 1]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`}
    const time = {time: `${dateObject.getHours() % 12 || 12}:${dateObject.getMinutes() < 10? dateObject.getMinutes() + "0": dateObject.getMinutes()} ${startMeridiem} - ${endDateObject.getHours() % 12 || 12}:${endDateObject.getMinutes() < 10? endDateObject.getMinutes() + "0" : endDateObject.getMinutes()} ${endMeridiem}`}
    
    // D: remove the fields, frontend does not require
    delete obj.startTimestamp;
    delete obj.endTimestamp;

    return {...obj, ...date, ...time} // D: a new object
}