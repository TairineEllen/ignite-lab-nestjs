import { Content } from "@application/entities/notification-content";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification, NotificationProps } from "../entities/notification";
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from "./errors/notification-not-found";

let notifications: NotificationProps[] = []


describe('Send notification', () => {
  it('should be able to cancel a notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(repository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'id'
    })

    await repository.create(notification);

     await cancelNotification.execute({
      notificationId: notification.id
    });
  
    expect(repository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(repository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'id'
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
