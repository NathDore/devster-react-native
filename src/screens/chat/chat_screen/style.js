import { StyleSheet } from "react-native";
import { blackTheme } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CHAT_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: blackTheme,
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: hp("3%"),
        paddingBottom: hp("3%"),
        paddingTop: hp("1%"),
        marginBottom: hp("1%"),
        backgroundColor: blackTheme,
    },
    profile_photo_name_row: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        color: "white",
        fontSize: hp(3),
        fontWeight: "bold",
        marginHorizontal: "5%",
    },
    conversation_feed: {
        flex: 1,
        display: "flex",
    },
    send_message_section_not_focus: {
        backgroundColor: blackTheme,
        width: "100%",
        height: hp(12),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        justifyContent: "space-evenly",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textInput_container: {
        height: hp("6.5%"),
        width: wp("80%"),
        backgroundColor: "lightgrey",
        borderRadius: 20,
    },
    textInput: {
        flex: 1,
        paddingLeft: wp(3),
        fontSize: hp(2),
        padding: wp(2)
    }
});