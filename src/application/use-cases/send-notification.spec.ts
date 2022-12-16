import { Notification, NotificationProps } from "../entities/notification";
import { SendNotification } from "./send-notification";

let notifications: NotificationProps[] = []

const notificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  }
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'id'
    });

    expect(notifications).toHaveLength(1);
  });
});
