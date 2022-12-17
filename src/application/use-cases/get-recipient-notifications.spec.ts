import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipients notifications', () => {
  it('should be able to get recipients notifications', async () => {
    const repository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new GetRecipientNotifications(repository);
  
    await repository.create(makeNotification({ recipientId: 'id-1'}));
    await repository.create(makeNotification({ recipientId: 'id-1'}));
    await repository.create(makeNotification({ recipientId: 'id-2'}));  

     const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'id-1'
    });
  
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'id-1' }),
      expect.objectContaining({ recipientId: 'id-1' }),
    ]));
  });  
});
