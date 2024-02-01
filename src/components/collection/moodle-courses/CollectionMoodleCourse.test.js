import React from 'react';
import { render } from '@testing-library/react';
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import { ReactComponent as CourseIcon } from '../../utilities/icons/avatar.svg';

it('renders', () => {
    render(<CollectionMoodleCourse
      onRemove={() => {}}
      label="123123"
      Icon={CourseIcon}
    />);
});
