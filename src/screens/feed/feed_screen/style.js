import { StyleSheet } from "react-native";
import { blackThemeSecondary, blackTheme } from "../../../../assets/color/color";

export const FEED_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
    },
    create_post_icon: {
        position: "absolute",
        alignSelf: "flex-end",
        top: "85%",
        right: "5%",
        width: 60,
        height: 60,
        borderRadius: 150,
        backgroundColor: blackTheme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        borderWidth: 1,
        borderColor: "white",
    },
    notification_bell: {
        width: 50,
        height: 50,
        borderRadius: 150,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: "3%",
        position: "absolute",
        backgroundColor: blackThemeSecondary,
        borderWidth: 0.5,
        borderColor: "lightgrey",
        marginTop: "2%",
    },
})