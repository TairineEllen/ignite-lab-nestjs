import { Content } from "@application/entities/notification-content";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(repository);

    const notification = makeNotification({
      readAt: new Date()
    });

    await repository.create(notification);

     await unreadNotification.execute({
      notificationId: notification.id
    });
  
    expect(repository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(repository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'id'
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
