// timeUtils.js

// these constants are the number of milliseconds in each time unit
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_SECOND = 1000;

export const getUnitDuration = (totalMilliseconds, unitMilliseconds) => {
    const unit = Math.floor(totalMilliseconds / unitMilliseconds);
    totalMilliseconds -= unit * unitMilliseconds;
    return { unit, remaining: totalMilliseconds };
};

export const getZeroPadded = (number) => number.toString().padStart(2, '0');

export const getDuration = (start, end) => {
    let { unit: hours, remaining: remAfterHours } = getUnitDuration(end - start, MILLISECONDS_IN_HOUR);
    let { unit: minutes, remaining: remAfterMinutes } = getUnitDuration(remAfterHours, MILLISECONDS_IN_MINUTE);
    let { unit: seconds } = getUnitDuration(remAfterMinutes, MILLISECONDS_IN_SECOND);

    const formatted = [hours, minutes, seconds].map(getZeroPadded).join(':');
    return formatted;
};
