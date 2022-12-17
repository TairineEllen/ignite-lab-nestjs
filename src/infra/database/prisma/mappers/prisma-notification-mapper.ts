import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { Notification as rawNotification } from  '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    }
  }

  static toDomain(rawNotification: rawNotification): Notification {
    return new Notification({
      category: rawNotification.category,
      content: new Content(rawNotification.content),
      recipientId: rawNotification.recipientId,
      readAt: rawNotification.readAt,
      canceledAt: rawNotification.canceledAt,
      createdAt: rawNotification.createdAt
    }, rawNotification.id)
  }
}
