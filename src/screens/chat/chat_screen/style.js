import { StyleSheet } from "react-native";
import { blackTheme } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CHAT_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: hp("3%"),
        paddingTop: hp("1%"),
        marginBottom: hp("1%"),
        backgroundColor: "black",
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
        backgroundColor: "black",
        width: "100%",
        height: hp(10),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        justifyContent: "space-evenly",
    },
    textInput_container: {
        height: hp("5.5%"),
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