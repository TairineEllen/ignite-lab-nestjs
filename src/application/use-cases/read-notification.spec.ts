import { Content } from "@application/entities/notification-content";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(repository);

    const notification = makeNotification();

    await repository.create(notification);

     await readNotification.execute({
      notificationId: notification.id
    });
  
    expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non existing notification', async () => {
    const repository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(repository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'id'
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
