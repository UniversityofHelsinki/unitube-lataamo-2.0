import useCollectionDropdown from "../collection/useCollectionDropdown";
import useUser from "../useUser";

const useDefaultCollection = () => {
  const [user] = useUser();
  const [collections] = useCollectionDropdown();

  const defaultCollectionTitle = `inbox ${user.eppn}`;

  return (collections || []).find((collection) =>
    collection.title === defaultCollectionTitle
  );
};

export default useDefaultCollection;
