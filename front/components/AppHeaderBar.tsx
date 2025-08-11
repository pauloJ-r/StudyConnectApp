import AppLogoIcon from "@/assets/icons/app-logo-icon.svg";
import NotificationIcon from "@/assets/icons/notification-icon.svg";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AppHeaderBar() {
  const {user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <AppLogoIcon width={40} height={40} />
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <NotificationIcon width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={user?.picturePath
              ? { uri: user.picturePath }
              : require("@/assets/images/avatar-web.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 48,
  },
});
