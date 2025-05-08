const useDeleteSubtitle = () => {

    const actionDeleteVideoVTTFile = async (eventId, language) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoTextTrack/${eventId}/${language}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                let responseJSON = await response.json();
                return responseJSON;
            }
        } catch (error) {
            console.error(error.message);
            throw new Error('error_delete_vtt_file', {
                cause: error
            });
        }
    };

    const deleteSubtitle = async (input) => {
        console.log(input.languages);
        if (input.deleteSubtitle && input.languages) {
            // Process each language in the array
            await Promise.all(input.languages.map(language =>
                actionDeleteVideoVTTFile(input.eventId, language)
            ));
        }
    };


    return [deleteSubtitle];
};

export default useDeleteSubtitle;
