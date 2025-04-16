import OneSignal from "react-native-onesignal";
export const initializeOneSignal = (appId) => {
  OneSignal.setAppId(appId);
  OneSignal.promptForPushNotificationsWithUserResponse();
};

export const scheduleNotification = (task) => {
  return new Promise((resolve, reject) => {
    OneSignal.getDeviceState().then((deviceState) => {
      const notificationObj = {
        headings: { en: "Task Reminder" },
        contents: { en: task.title },
        subtitle: { en: task.description || "" },
        send_after: new Date(task.reminderTime).toISOString(),
        data: { taskId: task.id },
        include_player_ids: [deviceState.userId],
      };
      OneSignal.postNotification(
        notificationObj,
        (success) => resolve(success),
        (error) => reject(error)
      );
    });
  });
};

export const cancelNotification = (notificationId) => {
  OneSignal.cancelNotification(notificationId);
};
