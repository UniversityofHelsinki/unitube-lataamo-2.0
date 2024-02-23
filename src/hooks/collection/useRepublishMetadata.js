const put = async (collection) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/acl/${collection.identifier}`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(collection)
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(
      `Unexpected response code ${response.status} from republishMetadata.`
    );
  } catch (error) {
    console.error(error);
    throw new Error('republish_metadata_request_error', {
      cause: error
    });
  }
};

const useRepublishMetadata = () => {

  const republish = async (collection) => {
    await put(collection);
  };

  return [republish];
};

export default useRepublishMetadata;
