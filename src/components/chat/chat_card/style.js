import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CHAT_CARD_STYLESHEET = StyleSheet.create({
    container: {
        maxWidth: "100%",
        paddingStart: wp("2%"),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: hp(0.07),
        borderColor: "lightgrey",
        padding: hp("4%"),
        paddingVertical: hp(1),
    },
    titleMessageContainer: {
        maxWidth: wp("70%"),
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginHorizontal: wp("3.5%"),
        paddingVertical: hp("1%"),
    },
    userName: {
        color: "white",
        fontWeight: "bold",
        fontSize: hp(2),
    },
    messageContainer: {
        width: wp("80%"),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    messageText: {
        marginRight: "3%",
        color: "white",
        fontSize: hp(2),
        fontWeight: "300"
    },
    timestamp: {
        fontWeight: "bold",
        color: "white",
        fontSize: hp(2),
        marginLeft: "5%",
    },
    last_message_you: {
        color: "grey",
        marginEnd: "1%",
        fontSize: hp(2.2),
    },
})