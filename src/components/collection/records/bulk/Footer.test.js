import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

it('renders', () => {
	render(
    <Footer onCancel={() => {}} onSave={() => {}} progressBarProps={{ }} submittable={false} progress={'not_started'} />
	);
});

