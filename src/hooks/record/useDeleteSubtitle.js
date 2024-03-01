const useDeleteSubtitle = () => {

    const actionDeleteVideoVTTFile = async (eventId) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoTextTrack/${eventId}`, {
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
      console.log('deleteSubtitle', input);
        if (input.deleteSubtitle) {
            //await actionDeleteVideoVTTFile(input.eventId);
        }
    };

    return [deleteSubtitle];
};

export default useDeleteSubtitle;
