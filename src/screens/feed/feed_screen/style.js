import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const FEED_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
    },
    create_post_icon: {
        position: "absolute",
        alignSelf: "flex-end",
        top: hp("80%"),
        right: wp("5%"),
        width: hp(8),
        height: hp(8),
        borderRadius: hp(8),
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        borderWidth: 1,
        borderColor: "white",
    },
    notification_bell: {
        width: hp(8),
        height: hp(8),
        borderRadius: hp(8),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: wp("3%"),
        backgroundColor: blackThemeSecondary,
        borderWidth: 0.5,
        borderColor: "lightgrey",
        position: "absolute",
        alignSelf: "center",
        top: hp("5%"),
    },
})