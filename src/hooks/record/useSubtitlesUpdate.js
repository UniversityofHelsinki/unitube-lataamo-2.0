
export const put = async (eventId, from, to) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${eventId}/translateFrom/${from}/to/${to}`;
    try {
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }
        });
        if (response.ok) {
            return await response.json();
        }

        throw new Error(`Unexpected status code ${response.status} from ${URL}.`);
    } catch (error) {
        console.error(error);
        throw new Error('error_record_update', {
            cause: error
        });
    }
};

const useSubtitlesUpdate = () => {
    const update = async (subtitles) => {
        let eventId = subtitles?.eventId;
        let from = subtitles?.value[0]?.from;
        let languages = subtitles?.value[1]?.to;
        let checkedLanguages = languages.filter(langObj => langObj.isChecked === true);
        let checkedLangValues = checkedLanguages.map(langObj => langObj.lang);
        let to = checkedLangValues.join(',');
        console.log('from:', from, '  to:', to);
        await put(eventId, from, to);
    };
    return [update];
};

export default useSubtitlesUpdate;
