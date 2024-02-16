import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const HEADER_STYLESHEET = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        padding: hp("2%"),
        alignItems: "center",
        paddingStart: wp("4%"),
        backgroundColor: blackThemeSecondary,
        justifyContent: "space-between",
        borderBottomWidth: hp(0.07),
        borderColor: "lightgrey",
    },
    title: {
        fontSize: hp(3),
        color: "lightgrey",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});