import React from "react";
import DeleteCollection from "../../components/collection/DeleteCollection";

const useCollectionActions = (collection, disabled = false) => {

    const defaultActions = [];

    const DeleteAction = () => {
        return (
            <DeleteCollection collection={collection} buttonDisabled={disabled} />
        );
    };

    return [ ...defaultActions, DeleteAction ];
};

export default useCollectionActions;
