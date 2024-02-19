import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const REGISTER_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
    },
    header: {
        flexDirection: "row",
        width: wp("100%"),
        padding: wp("5%"),
        justifyContent: "space-between",
        alignItems: "center",
    },
    header_title: {
        color: "white",
        fontSize: wp(5),
    },
    title_container: {
        width: "100%",
        padding: wp("10%"),
    },
    title: {
        color: "white",
        fontSize: hp(4),
        letterSpacing: 0.2,
    },
    subtitle: {
        color: "lightgrey",
        fontSize: hp(3),
        letterSpacing: 0.5,
    },
    field: {
        width: wp("90%"),
        borderWidth: 0.5,
        borderColor: "lightgrey",
        height: hp(8),
        alignSelf: "center",
        alignItems: "center",
        borderRadius: wp(3),
        marginVertical: hp("2%"),
        flexDirection: "row",
    },
    textInput: {
        color: "lightgrey",
        fontSize: hp(3),
        flex: 1,
        paddingStart: wp(5),
        height: "100%",
    },
    error: {
        color: 'red',
        alignSelf: "center",
        textAlign: "center",
        fontSize: hp(2),
    },
    submit_button_valid: {
        width: wp("70%"),
        backgroundColor: "lightgrey",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp("1%"),
        padding: hp("1%"),
        borderRadius: hp(2),
    },
    submit_button_valid_text: {
        color: blackThemeSecondary,
        fontSize: hp(3.5),
    },
    submit_button_invalid: {
        width: wp("70%"),
        borderWidth: 0.5,
        borderColor: "lightgrey",
        backgroundColor: blackThemeSecondary,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp("1%"),
        padding: wp("2.5%"),
        borderRadius: 18,
    },
    submit_button_invalid_text: {
        color: "white",
        fontSize: hp(3.5),
    },
    show_password_container: {
        padding: "3%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})
