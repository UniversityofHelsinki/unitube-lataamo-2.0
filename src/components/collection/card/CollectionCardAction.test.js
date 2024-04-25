import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactComponent as RandomIcon } from '../../utilities/icons/alert.svg';
import CollectionCardAction from "./CollectionCardAction";

it('renders', () => {
    render(<CollectionCardAction icon={<RandomIcon />} onClick={() => {}} label="Restore" />);
});
