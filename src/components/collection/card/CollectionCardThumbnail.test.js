import { render, screen } from '@testing-library/react';
import CollectionCardThumbnail from "./CollectionCardThumbnail";
import React from "react";

const collectionCardRecord = {id: '1', title : 'test record', cover_image: 'xxxxx' };

it("Renders", () => {
    render(<CollectionCardThumbnail record={collectionCardRecord} />);
});
