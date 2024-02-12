import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../../../assets/color/color";

export const CHAT_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    header: {
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "3%",
        paddingBottom: "3%",
        paddingTop: "1%",
        marginBottom: "3%",
    },
    profile_photo_name_row: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: "5%",
    },
    conversation_feed: {
        flex: 1,
        display: "flex",
    },
    send_message_section_focus: {
        backgroundColor: "black",
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        justifyContent: "space-evenly",
    },
    send_message_section_not_focus: {
        backgroundColor: "black",
        width: "100%",
        height: 80,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        justifyContent: "space-evenly",
    },
    textInput_container: {
        height: "75%",
        width: "80%",
        backgroundColor: "lightgrey",
        borderRadius: 20,
    },
    textInput: {
        flex: 1,
        paddingLeft: 20,
        fontSize: 20,
    }
});