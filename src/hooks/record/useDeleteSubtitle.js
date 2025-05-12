const useDeleteSubtitle = () => {

    const actionDeleteVideoVTTFile = async (eventId, languages) => {
        try {
            const languagesParam = languages.join(',');
            let response = await fetch(`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoTextTrack/${eventId}/${languagesParam}`, {
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
        if (input.deleteSubtitle && input.languages) {
            actionDeleteVideoVTTFile(input.eventId, input.languages)
        }
    };


    return [deleteSubtitle];
};

export default useDeleteSubtitle;
