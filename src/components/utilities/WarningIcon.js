import React from 'react';
import {ReactComponent as WarningIcon} from './icons/warning.svg';
import HyColors from "./HyColors";

const ThreeMonthsWarning = ({ deletionDate }) => {
    // Parse the deletionDate string into a Date object
    const deletionDateObject = new Date(deletionDate);
    // Calculate the date three months from now
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    // Check if the deletionDate is three months from now or less
    const isDeletionDateNear = deletionDateObject <= threeMonthsFromNow;

    return isDeletionDateNear ? (
        <WarningIcon height={20} width={20} fill={ HyColors.orange } />
    ) : null;
};

export default ThreeMonthsWarning;
