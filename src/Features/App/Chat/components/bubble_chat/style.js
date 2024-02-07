import { StyleSheet } from "react-native";

export const BUBBLE_CHAT_STYLESHEET = StyleSheet.create({
    receiver_container: {
        width: "100%",
        marginVertical: "5%",
        paddingHorizontal: "5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
    receiver_message_section: {
        justifyContent: "center",
        backgroundColor: "lightgrey",
        borderRadius: 20,
        marginHorizontal: "2%",
        padding: "3%",
    },
    receiver_message_content: {
        marginHorizontal: "2%"
    },
    sender_container: {
        width: "100%",
        marginVertical: "5%",
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingHorizontal: "5%",
        alignItems: "center",
    },
    sender_message_section: {
        justifyContent: "center",
        backgroundColor: "lightgrey",
        borderRadius: 20,
        marginHorizontal: "2%",
        padding: "3%",
    },
    sender_message_content: {
        marginHorizontal: "2%"
    },
});