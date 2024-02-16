import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const LANDING_STYLESHEET = StyleSheet.create({
    section: {
        height: hp("50%"),
    },
    title: {
        marginTop: hp("10%"),
        color: "white",
        alignSelf: "center",
        fontSize: hp("7%"),
        fontWeight: "bold",
    },
    subtitle: {
        color: "white",
        alignSelf: "center",
        fontSize: hp("2%"),
        fontWeight: "500",
        letterSpacing: 1,
    },
    contact_container: {
        flexDirection: "column",
        justifyContent: "center",
        marginVertical: hp("5%"),
    },
    contact_button_container: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: hp("2%"),
    },
    contact_text: {
        alignSelf: "center",
        color: "white",
        fontSize: hp("2%"),
    },
    contact_button: {
        marginHorizontal: wp("2%"),
        width: wp("10%"),
        height: wp("10%"),
        backgroundColor: blackThemeSecondary,
        borderRadius: wp("10%"),
        justifyContent: "center",
        alignItems: "center",
    },

    description_container: {
        width: wp("90%"),
        alignSelf: "center",
    },
    description_text: {
        textAlign: "center",
        color: "grey",
        fontSize: wp(3.5),
        letterSpacing: 0.8,
    },
    create_account_button: {
        width: wp("80%"),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: blackThemeSecondary,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: "white",
        marginVertical: hp("5%"),
        padding: wp("3%"),
    },
    create_account_button_text: {
        color: "white",
        fontSize: wp(5),
        fontWeight: "300",
    },
    sign_in_button: {
        alignSelf: "center",
        padding: wp("3%"),
    },
    sign_in_button_text: {
        color: "white",
        fontSize: wp(5),
    }
})