import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NotificationProvider, { useNotification } from './NotificationContext';

it('renders', () => {
    render(
        <NotificationProvider>
            <></>
        </NotificationProvider>,
    );
});

const TestNotificationWriter = ({ notification }) => {
    const { setNotification } = useNotification();

    return <button onClick={() => setNotification(notification)}>Send</button>;
};

const TestNotificationReader = () => {
    const { notification } = useNotification();
    return <span>{notification?.content}</span>;
};

const TestComponent = ({ notification }) => {
    return (
        <NotificationProvider>
            <TestNotificationWriter notification={notification} />
            <TestNotificationReader />
        </NotificationProvider>
    );
};

describe('NotificationProvider', () => {
    describe('After setting notification', () => {
        test('Notification is seen by the readers', async () => {
            const notification = 'asdf';
            const component = <TestComponent notification={notification} />;
            render(component);

            const button = await screen.findByText('Send');

            await userEvent.click(button);
            expect(await screen.findByText(notification)).toBeTruthy();
        });
    });
});
