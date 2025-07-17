import { Notification } from "@/types/notification";
import { FlatList } from "react-native";
import NotificationItem from "./NotificationItem";

type NotificationListProps = {
    notifications: Notification[];
    onDelete: (id: number) => void;
};

export default function NotificationList({ notifications, onDelete }: NotificationListProps) {

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <NotificationItem
                    notificationData={item}
                    onDelete={() => onDelete(item.id)}
                />
            )}
        />
    );
}