import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NotificationArea from './NotificationArea';
import NotificationProvider, { useNotification } from './NotificationContext';

it('renders', () => {
    render(
        <NotificationProvider>
            <NotificationArea />
        </NotificationProvider>,
    );
});

const TestComponent = () => {
    const Setter = () => {
        const { setNotification } = useNotification();
        return <button onClick={() => setNotification('asdf')}>Send</button>;
    };

    return (
        <NotificationProvider>
            <NotificationArea />
            <Setter />
        </NotificationProvider>
    );
};

describe('NotificationArea', () => {
    test('shows the notification defined set somewhere else', async () => {
        render(<TestComponent />);

        const button = screen.queryByText('Send');
        await userEvent.click(button);

        expect(await screen.findByText('asdf')).toBeTruthy();
    });

    test('Notification has aria-live set', async () => {
        const rendered = render(<TestComponent />);
        await userEvent.click(screen.queryByText('Send'));

        await screen.findByText('asdf');

        const byAttribute = rendered.container.querySelector(`[aria-live=assertive]`);

        expect(byAttribute).toBeTruthy();
    });

    test('Notification area contains close button', async () => {
        const rendered = render(<TestComponent />);
        await userEvent.click(screen.queryByText('Send'));

        const closeButton = await screen.findByText('notification_area_close_button_label');
        expect(closeButton).toBeTruthy();
    });
});
