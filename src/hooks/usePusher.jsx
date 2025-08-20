import { useEffect } from "react";
import Pusher from "pusher-js";

const usePusher = (events) => {
  const APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
  const APP_CHANNEL = process.env.NEXT_PUBLIC_PUSHER_APP_CHANNEL;

  useEffect(() => {
    let pusher;
    let channel;
    let retryCount = 0;
    const maxRetries = 3;

    const connect = () => {
      try {
        if (!APP_KEY || !APP_CLUSTER || !APP_CHANNEL) {
          throw new Error(
            `Missing environment variables: ${[
              !APP_KEY && "NEXT_PUBLIC_PUSHER_APP_KEY",
              !APP_CLUSTER && "NEXT_PUBLIC_PUSHER_APP_CLUSTER",
              !APP_CHANNEL && "NEXT_PUBLIC_PUSHER_APP_CHANNEL",
            ]
              .filter(Boolean)
              .join(", ")}`
          );
        }

        pusher = new Pusher(APP_KEY, {
          cluster: APP_CLUSTER,
          encrypted: true,
        });

        if (
          pusher.connection.state === "disconnected" ||
          pusher.connection.state === "failed"
        ) {
          pusher.connect();
        }

        channel = pusher.subscribe(APP_CHANNEL);
        console.log("🚀 ~ useEffect ~ channel:", channel);

        channel.bind("pusher:subscription_succeeded", () => {
          console.log(`Successfully subscribed to ${APP_CHANNEL}`);
        });

        channel.bind("pusher:subscription_error", (error) => {
          console.error(`Subscription to ${APP_CHANNEL} failed:`, error);
        });

        Object.entries(events).forEach(([event, handler]) => {
          channel.bind(event, handler);
        });

        pusher.connection.bind("connected", () => {
          console.log("Connected to Pusher");
          retryCount = 0;
        });

        pusher.connection.bind("error", (err) => {
          console.error("Pusher connection error:", err);
        });

        pusher.connection.bind("disconnected", () => {
          console.log("Pusher disconnected");
          if (retryCount < maxRetries) {
            setTimeout(() => {
              console.log("Attempting to reconnect...");
              pusher.connect();
              retryCount++;
            }, 3000);
          }
        });

        pusher.connection.bind("state_change", (states) => {
          console.log("Pusher state changed:", states);
        });
      } catch (error) {
        console.error("Pusher initialization error:", error);
      }
    };

    connect();

    return () => {
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
      if (pusher) {
        pusher.disconnect();
      }
    };
  }, [APP_CHANNEL, APP_CLUSTER, APP_KEY, events]); 

  return null;
};

export default usePusher;