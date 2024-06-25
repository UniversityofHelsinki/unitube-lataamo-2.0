import React from "react";
import DeleteCollection from "../../components/collection/DeleteCollection";

const useCollectionActions = (collection, disabled = false) => {

    const defaultActions = [];

    const deleteAction = <DeleteCollection collection={collection} buttonDisabled={disabled} />;

    return [ ...defaultActions, deleteAction ];
};

export default useCollectionActions;
