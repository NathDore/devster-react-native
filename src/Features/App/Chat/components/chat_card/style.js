import { StyleSheet } from "react-native";

export const CHAT_CARD_STYLESHEET = StyleSheet.create({
    container: {
        width: "100%",
        paddingStart: "2%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderColor: "#d1d0d059",
        padding: "1%",
    },
    titleMessageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginHorizontal: "2%",
        paddingVertical: "2%",
    },
    userName: {
        color: "white",
        fontWeight: "bold",
    },
    messageContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
    },
    messageText: {
        marginRight: "3%",
        color: "white"
    },
    timestamp: {
        fontWeight: "bold",
        color: "white"
    }
})