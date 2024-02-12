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
    go_back_icon: {
        position: "absolute",
        alignSelf: "flex-start",
        left: "2%",
        top: "15%",
        padding: "2%",
        justifyContent: "center",
        alignItems: "center",
    },
    profile_picture: {
        top: "50%",
        right: "25%",
    },
    profile_picture_container: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.7,
        borderColor: "lightgrey",
        borderRadius: 150,
    },
    bottom_section: {
        height: "85%",
        paddingTop: "25%",
        alignItems: "center",
    },
    label_name: {
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "lightgrey",
        padding: "5%",
    },
    text_label: {
        fontSize: 25,
        fontWeight: "bold",
        color: "lightgrey",
    },
    text_input: {
        fontSize: 25,
        fontWeight: "300",
        color: "lightgrey",
        paddingStart: 25,
    },
})