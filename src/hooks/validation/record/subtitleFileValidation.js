const validateSubtitleFile = async (file, record) => {

    const send = async (file) => {
        const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/validateVTTFile`;
        try {
            const response = await fetch(URL, {
                method: 'POST',
                body: file
            });
            if (response.ok) {
                return false;
            } else if (response.status === 400) {
                return "record_validation_subtitle_invalid_format";
            }

        } catch (error) {
            console.log(error);
        }
        return "record_validation_subtitle_unknown_error";
    };

    if (file) {
        const data = new FormData();
        data.append('video_text_track_file', file);
        return await send(data);
    }
    return 'record_validation_subtitle_file_empty';
};

export default validateSubtitleFile;
