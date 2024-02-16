import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BUBBLE_CHAT_STYLESHEET = StyleSheet.create({
    receiver_container: {
        width: "100%",
        marginVertical: hp("0.7%"),
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingHorizontal: wp("2%"),
        alignItems: "center",
    },
    receiver_message_section: {
        maxWidth: "70%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        borderWidth: 1,
        borderColor: "lightblue",
        borderRadius: 20,
        marginHorizontal: wp("2%"),
        padding: hp("1%"),
    },
    receiver_message_content: {
        marginHorizontal: "2%",
        fontSize: hp(2),
    },
    sender_container: {
        width: "100%",
        marginVertical: hp("0.7%"),
        paddingHorizontal: wp("4%"),
        flexDirection: "colunm",
        alignItems: "flex-start",
    },
    sender_message_section: {
        maxWidth: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgrey",
        borderRadius: 20,
        marginHorizontal: wp("5%"),
        padding: hp("1%"),
    },
    sender_message_content: {
        marginHorizontal: "2%",
        fontSize: hp(2)
    },
});