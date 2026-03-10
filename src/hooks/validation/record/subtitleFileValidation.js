const validateSubtitleFile = async (files, record) => {

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

    const formatValidations = {};

    if (files) {
        for (let key in files) {
            if (files.hasOwnProperty(key)) {
                let value = files[key];
                if (value) {
                    const data = new FormData();
                    data.append(key, value);
                    let response = await send(data);
                    if (response !== false) {
                        formatValidations[key] = "record_validation_subtitle_invalid_format";
                    }
                }
            }
        }
        if (Object.entries(formatValidations).length > 0) {
            return formatValidations;
        }
        return false;
    }
    return 'record_validation_subtitle_file_empty';
};

export default validateSubtitleFile;
