import useVideos from "../useVideos";
import {useTranslation} from "react-i18next";
import useUser from "../useUser";

const deleted = (t, user) => (record) => {
    const isInTrash = record.series === `trash ${user.eppn}`;
    if (isInTrash) {
        return {
            label: t('tag_deleted'),
            color: 'red'
        };
    }
    return null;
};

const expiring = (t) =>  (record) => {
    // Parse the deletionDate string into a Date object
    const deletionDateObject = new Date(record.deletionDate);
    // Calculate the date three months from now
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    // Check if the deletionDate is three months from now or less
    const isDeletionDateNear = deletionDateObject <= threeMonthsFromNow;

    if (isDeletionDateNear) {
        return {
            label: t('tag_expiring'),
            color: 'orange'
        };
    }
};

const processing = (t) => (record) => {
    const processing_record = record.processing_state === 'RUNNING';

    if (processing_record) {
        return {
            label: t('tag_processing'),
            color: 'orange'
        };
    }
};

const cc =  (t) => (record) => {
    const videos = useVideos(record.identifier);
    const subtitles = videos?.map((video) => video.vttFile).filter(file => file !== undefined && file !== '');
    if (subtitles && subtitles.length > 0) {
        return {
            label: t('tag_cc'),
            color: 'green'
        };
    }
}

const useRecordTagOptions = (records) => {
    const {t} = useTranslation();
    const [user] = useUser();
    const inboxrecords = records;

    const tagFunctions = [deleted(t, user), expiring(t), cc(t), processing(t)];

    const tags = [];

    for (const record of inboxrecords) {
        const recordtags = tagFunctions.map( (tagfunc) => {
            return  tagfunc(record);
        }).filter(tag => tag);

        for (const tag of recordtags) {
            const allreadyintags = tags.map(t => t.label).includes(tag.label);
            if (!allreadyintags) {
                tags.push(tag);
            }
        }
    }
    return tags;

};

export default useRecordTagOptions;
