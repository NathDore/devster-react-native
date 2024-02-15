import { StyleSheet } from "react-native";
import { blackTheme } from "../../../../assets/color/color";

export const CHAT_CARD_STYLESHEET = StyleSheet.create({
    container: {
        width: "100%",
        paddingStart: "2%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.2,
        borderColor: "lightgrey",
        padding: "1%",
        paddingVertical: "2%",
    },
    titleMessageContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginHorizontal: "5%",
        paddingVertical: "2%",
    },
    userName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    messageContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    messageText: {
        marginRight: "3%",
        color: "white",
        fontSize: 18,
        fontWeight: "300"
    },
    timestamp: {
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
        marginLeft: "5%",
    },
    last_message_you: {
        color: "grey",
        marginEnd: "1%",
        fontSize: 18,
    },
})