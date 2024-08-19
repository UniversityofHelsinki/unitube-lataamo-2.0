// timeUtils.js

// these constants are the number of milliseconds in each time unit
import i18n from "i18next";

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_SECOND = 1000;

export const getUnitDuration = (totalMilliseconds, unitMilliseconds) => {
    const unit = Math.floor(totalMilliseconds / unitMilliseconds);
    totalMilliseconds -= unit * unitMilliseconds;
    return { unit, remaining: totalMilliseconds };
};

export const getDurationInHoursMinutesSeconds = (start, end) => {
    let { unit: hours, remaining: remAfterHours } = getUnitDuration(end - start, MILLISECONDS_IN_HOUR);
    let { unit: minutes, remaining: remAfterMinutes } = getUnitDuration(remAfterHours, MILLISECONDS_IN_MINUTE);
    let { unit: seconds } = getUnitDuration(remAfterMinutes, MILLISECONDS_IN_SECOND);

    return `${hours} h ${minutes} min ${seconds} sec`;
};

export const getTimeFormat = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };

    const formattedStartDate = new Intl.DateTimeFormat('fi-FI', optionsDate).format(startDate);
    const startHours = startDate.toLocaleTimeString('fi-FI', optionsTime);

    const endHours = endDate.toLocaleTimeString('fi-FI', optionsTime);

    return `${formattedStartDate} ${startHours} - ${endHours}`;
};

export const formatTime = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
};
