import { ProgressStatus } from "../../Constants";
import {useState} from "react";

    const put = async (id, expiryDate) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${id}/updateArchivedDateOfVideosInSerie`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expiryDate)
            });
            if(response.status === 200) {
                let responseJSON = await response.json();
                return responseJSON;
            } else {
                throw new Error(response.status);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const useRecordsDeletionDatesUpdate = () => {

        const defaultAnimatedPercentage = 100;
        const [progress, setProgress] = useState({
            status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.NOT_STARTED,
            percentage: defaultAnimatedPercentage
        });

        const updateExpiryDates = async (id, expiryDate) => {
            setProgress({
                status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.IN_PROGRESS,
                percentage: 100
            });
            try {
                await put(id, expiryDate);
                setProgress({
                    status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.DONE,
                    percentage: 100
                });
            } catch (error) {
                console.error(error);
                setProgress({
                    status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.ERROR,
                    percentage: 100,
                    message: error.message
                });
            }
        };

        const resetProgress = () => {
            setProgress({
                status: ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.NOT_STARTED,
                percentage: defaultAnimatedPercentage
            });
        };

        return [updateExpiryDates, progress, resetProgress];
};

export default useRecordsDeletionDatesUpdate;
