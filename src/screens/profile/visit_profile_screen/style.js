import { StyleSheet } from "react-native";
import { blackTheme } from "../../../../assets/color/color";

export const VISIT_PROFILE_STYLESHEET = StyleSheet.create({
    container: {
        backgroundColor: blackTheme,
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    navigation_banner: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "2%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    go_back_icon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 150,
        backgroundColor: "black"
    },
    more_option_icon: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 150,
        backgroundColor: "black"
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingStart: "2%",
        paddingTop: "2%",
        paddingBottom: "1%",
    },
    info_banner: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    info_profile_picture: {
        justifyContent: "center",
        alignItems: "center",
        width: 71,
        height: 71,
        borderWidth: 0.5,
        borderRadius: 150,
        borderColor: "black",
    },
    name: {
        marginHorizontal: "5%",
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        maxWidth: '80%',
    },
    button_container: {
        direction: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: "3%",
    },
    add_contact_button: {
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "white",
        padding: "1.5%",
        borderRadius: 15,
        backgroundColor: "black",
        elevation: 1,
    },
    add_contact_button_text: {
        color: "white"
    },
    send_message_button: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "white",
        padding: "1.5%",
        borderRadius: 15,
        backgroundColor: "black",
        elevation: 1,
        width: 90,
        marginHorizontal: "1%",
    },
    send_message_button_text: {
        color: "white",
        fontSize: 11
    },
    banner: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        paddingVertical: "3%",
        paddingStart: "3%",
        alignItems: "center",
    },
    section_title_container: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: "lightgrey",
        marginHorizontal: "2%",
        justifyContent: "center",
        alignItems: "center",
    },
    section_title_text: {
        color: "lightgrey",
        fontSize: 11,
    }
});