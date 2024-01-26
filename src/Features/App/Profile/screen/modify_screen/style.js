import { StyleSheet } from "react-native";

export const MODIFY_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202124",
        position: "relative"
    },
    image_background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    profile_picture: {
        top: "50%",
    },
    modify_button: {
        backgroundColor: "black",
        width: 100,
        height: 30,
        marginTop: "2%",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        padding: "1%",
    },
    modify_button_text: {
        color: "white",
        fontSize: 10,
    },
    bottom_section: {
        height: "70%",
        paddingTop: "25%",
        alignItems: "center",
    },
    username_section: {
        width: "90%",
        height: 50,
        borderRadius: 15,
        backgroundColor: "lightgrey",
        paddingStart: "2%",
    },
    username_text_input: {
        flex: 1,
    }
})