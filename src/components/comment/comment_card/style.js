import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const COMMENT_STYLESHEET = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
        width: '100%',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
        backgroundColor: blackThemeSecondary,
        display: "flex",
        flexDirection: "column",
    },
    info_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    username: {
        marginLeft: wp("1%"),
        fontSize: hp(2),
        fontWeight: "400",
        color: "white",
    },
    timestamp: {
        marginLeft: wp("1%"),
        fontSize: hp(1.5),
        color: "lightgrey"
    },
    post_container: {
        width: "100%",
        marginVertical: hp("1%"),
        paddingHorizontal: wp("3%"),
    },
    post_text: {
        fontWeight: "300",
        color: "white",
    },
});