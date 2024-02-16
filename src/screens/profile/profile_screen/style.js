import { StyleSheet } from "react-native";

export const PROFILE_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202124",
        display: "flex",
        flexDirection: "column",
    },
    backIcon: {
        marginVertical: "2%",
        marginHorizontal: "5%"
    },
    topSection: {
        justifyContent: "flex-start",
        width: "100%",
        alignItems: "center",
    },
    profile_picture: {
        marginTop: "5%",
        marginBottom: "2%",
    },
    modify_button: {
        borderWidth: 1,
        elevation: 1,
        backgroundColor: "black",
        width: 150,
        borderColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        marginTop: "3%",
        marginBottom: "5%",
    },
    button_text: {
        color: "white",
    },
    username: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },
    bottom_section: {
        flex: 1,
        backgroundColor: "#00000080",
        borderTopWidth: 0.5,
        borderColor: "lightgrey",
    },
    bottom_header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        backgroundColor: "rgba(8, 8, 8, 0.91)",
        paddingStart: "5%",
    },
    publication_title_header_text: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
    },
    publication_title_header_underline: {
        borderBottomWidth: 1,
        borderColor: "lightblue",
    },

})