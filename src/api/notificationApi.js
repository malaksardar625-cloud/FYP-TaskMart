import { apiClient } from './apiClient'

/**
 * Get all notifications for logged-in user
 */
export const getNotifications = (navigate) => {
  return apiClient('/notifications', {}, navigate)
}

/**
 * Get unread notifications count
 */
export const getUnreadCount = (navigate) => {
  return apiClient('/notifications/unread-count', {}, navigate)
}

/**
 * Mark a single notification as read
 */
export const markAsRead = (notificationId, navigate) => {
  return apiClient(
    `/notifications/${notificationId}/read`,
    {
      method: 'PATCH',
    },
    navigate
  )
}

/**
 * Mark all notifications as read
 */
export const markAllAsRead = (navigate) => {
  return apiClient(
    '/notifications/mark-all-read',
    {
      method: 'PATCH',
    },
    navigate
  )
}

/**
 * Delete a notification
 */
export const deleteNotification = (notificationId, navigate) => {
  return apiClient(
    `/notifications/${notificationId}`,
    {
      method: 'DELETE',
    },
    navigate
  )
}

/**
 * Clear all notifications
 */
export const clearNotifications = (navigate) => {
  return apiClient(
    '/notifications',
    {
      method: 'DELETE',
    },
    navigate
  )
}
