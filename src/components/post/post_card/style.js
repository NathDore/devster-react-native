import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const POST_STYLESHEET = StyleSheet.create({
    card_container: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#d1d0d059',
        width: '100%',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1%'),
    },
    info_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    username: {
        marginLeft: wp("3%"),
        fontSize: hp(2),
        fontWeight: "400",
        color: "white",
    },
    timestamp: {
        marginLeft: "2%",
        fontSize: hp(2),
        color: "lightgrey"
    },
    post_container: {
        width: "100%",
        marginVertical: hp("1%"),
        paddingHorizontal: wp("1%"),
    },
    post_text: {
        fontWeight: "300",
        color: "white",
        fontSize: hp(2.5),
    },
    reaction_container: {
        width: "100%",
        padding: hp("1%"),
        display: "flex",
        flexDirection: "row",
    },
    like_button_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: hp("1%"),
        height: "100%",
    },
    like_button_text: {
        color: "white",
        marginHorizontal: wp("1%"),
        fontSize: hp(2),
    },
    like_icon: {
        marginRight: wp("2%"),
    },
    comment_button_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: hp("1%"),
        height: "100%",
    },
    comment_button_text: {
        color: "white",
        marginHorizontal: wp("1%"),
        fontSize: hp(2),
    },
});