import { Content } from "@application/entities/notification-content";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification, NotificationProps } from "../entities/notification";
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Count recipients notifications', () => {
  it('should be able to count recipients notifications', async () => {
    const repository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(repository);
  
    await repository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'id-1'
    }));

    await repository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'id-1'
    }));

    await repository.create(new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'id-2'
    }));

     const { count } = await countRecipientNotifications.execute({
      recipientId: 'id-1'
    });
  
    expect(count).toEqual(2);
  });

  
});
