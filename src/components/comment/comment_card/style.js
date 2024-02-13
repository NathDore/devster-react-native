import { StyleSheet } from "react-native";

export const COMMENT_STYLESHEET = StyleSheet.create({
    info_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    username: {
        marginLeft: "1%",
        fontSize: 15,
        fontWeight: "400",
        color: "white",
    },
    timestamp: {
        marginLeft: "2%",
        fontSize: 12,
        color: "lightgrey"
    },
    post_container: {
        width: "100%",
        marginVertical: "2%",
        paddingHorizontal: "1%",
    },
    post_text: {
        fontWeight: "300",
        color: "white",
    },
    reaction_container: {
        width: "100%",
        padding: "2%",
        display: "flex",
        flexDirection: "row",
    },
    like_icon: {
        marginHorizontal: "5%"
    }
});