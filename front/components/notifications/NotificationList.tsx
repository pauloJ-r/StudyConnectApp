import { Notification } from "@/types/notification";
import { FlatList } from "react-native";
import NotificationItem from "./NotificationItem";

type NotificationListProps = {
    notifications: Notification[];
};

export default function NotificationList({ notifications }: NotificationListProps) {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <NotificationItem notificationData={item} />
            )}
        />
    );
}