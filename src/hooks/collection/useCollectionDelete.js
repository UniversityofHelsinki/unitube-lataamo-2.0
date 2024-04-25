import { useState } from "react";
import { ProgressStatus } from "../../Constants";

const delCollection = async (body, identifier) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
    try {
        const response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body),
        });
        if (response.ok || response.status === 204) {
            return;// await response.json();
        }
        throw new Error(`Unexpected status code ${response.status} from ${URL}.`);
    } catch (error) {
        console.error(error.message);
        throw new Error(`Error occurred for delete request for ${URL}`, {
            cause: error
        });
    }
};

const getCollection = async (identifier) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`
    try {
        const response = await fetch(URL);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Unexpected status code ${response.status} while fetching record from ${URL} for collection deletion.`);
    } catch (error) {
        console.error(error.message);
    }
};


const convertToBody = (collection) => ({
    identifier: collection.identifier,
    title: collection.title,
    description: collection.description
});

const doesNotContainEverythingNeeded = (collection) => {
    return !collection.identifier && collection.id;
};

const useCollectionDelete = () => {

    const defaultAnimatedPercentage = 100;
    const notStartedProgress = {
        status: ProgressStatus.COLLECTION_DELETE.NOT_STARTED,
        percentage: defaultAnimatedPercentage
    };
    const [progress, setProgress] = useState(notStartedProgress);

    const deleteCollection = async (collection) => {
        setProgress({
            status: ProgressStatus.COLLECTION_DELETE.IN_PROGRESS,
            percentage: defaultAnimatedPercentage
        });
        try {
            if (doesNotContainEverythingNeeded(collection)) {
                const completeCollection = await getCollection(collection.id);
                await delCollection(convertToBody(completeCollection), completeCollection.identifier);
            } else {
                await delCollection(convertToBody(collection), collection.identifier);
            }
            setProgress({
                status: ProgressStatus.COLLECTION_DELETE.DONE,
                percentage: 100
            });
        } catch (error) {
            console.error(error);
            setProgress({
                status: ProgressStatus.COLLECTION_DELETE.ERROR,
                percentage: 100,
                message: error.message
            });
        }
    };

    const resetProgress = () => setProgress(notStartedProgress);

    return [deleteCollection, progress, resetProgress];

};

export default useCollectionDelete;
