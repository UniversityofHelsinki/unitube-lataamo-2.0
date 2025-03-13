

const convertToBody = (record) => ({
  identifier: record.identifier,
  description: record.description,
  title: record.title,
  isPartOf: record.isPartOf,
  license: record.license
});

export const put = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userVideos/${record.identifier}`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(convertToBody(record)),
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

const putDeletionDate = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record.identifier}/deletionDate`;
  try {
    const response = await fetch (URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        deletionDate: record.deletionDate
      })
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error.message);
    throw new Error('error_record_deletion_date_update', {
      cause: error
    });
  }
};
const useRecordUpdate = () => {

  const save = async (record) => {
    await put(record);
    await putDeletionDate(record);
  };

  return [save];
};

export default useRecordUpdate;
