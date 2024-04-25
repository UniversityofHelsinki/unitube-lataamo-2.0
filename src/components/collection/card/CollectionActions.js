import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionActions.css';
import useCollectionActions from '../../../hooks/collection/useCollectionActions';

const CollectionActions = ({ collection, disabled }) => {
    const actions = useCollectionActions(collection, disabled);
    return (<ul className="collection-card-actions">
            {actions.map((Action, i) =>
                <li key={i}>
                    <Action />
                </li>)}
        </ul>
    );
};

CollectionActions.propTypes = {
    collection: PropTypes.object,
};

export default CollectionActions;
