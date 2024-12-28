import React, { useEffect, useRef, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // Set to true to play sound
    shouldSetBadge: true, // Set to true to update badge count
  }),
});

export const useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      const token = await messaging().getToken();
      console.log("token: ", token);
      setExpoPushToken(token); // Store the token
    } else {
      console.log("Notification permission denied");
    }

    return enabled;
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);
      // Display the notification when the app is in the foreground
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage.notification?.title || "New Notification",
          body: remoteMessage.notification?.body || "You have a new message.",
          data: remoteMessage.data,
        },
        trigger: null, // Trigger immediately
      });
    });

    requestUserPermission();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    notification,
    requestUserPermission,
  };
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  // EAS projectId is used here.
  try {
    // // const projectId =
    // //   Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    // if (!projectId) {
    //   throw new Error('Project ID not found');
    // }
    // token = (
    //   await Notifications.getExpoPushTokenAsync({
    //     projectId,
    //   })
    // ).data;
    // console.log(token);
  } catch (e) {
    token = `${e}`;
  }
  // } else {
  // alert('Must use physical device for Push Notifications');
  // }

  return token;
}
