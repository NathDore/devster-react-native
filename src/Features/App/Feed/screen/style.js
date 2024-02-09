import { StyleSheet } from "react-native";

export const FEED_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    create_post_icon: {
        position: "absolute",
        alignSelf: "flex-end",
        top: "85%",
        right: "5%",
        width: 60,
        height: 60,
        borderRadius: 150,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
    }
})