import { StyleSheet } from "react-native";

export const POST_STYLESHEET = StyleSheet.create({
    card_container: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#d1d0d059',
        width: '100%',
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        backgroundColor: "#202124",
    },
    info_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    username: {
        marginLeft: "1%",
        fontSize: 18,
        fontWeight: "400",
        color: "white",
    },
    timestamp: {
        marginLeft: "2%",
        fontSize: 15,
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
        fontSize: 20,
    },
    reaction_container: {
        width: "100%",
        padding: "2%",
        display: "flex",
        flexDirection: "row",
    },
    like_button_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    like_button_text: {
        color: "white",
        marginHorizontal: "5%",
        fontSize: 15,
    },
    like_icon: {
        marginHorizontal: "5%",
    },
    comment_button_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    comment_button_text: {
        color: "white",
        marginHorizontal: "5%",
        fontSize: 15,
    },
});