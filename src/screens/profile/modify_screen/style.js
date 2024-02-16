import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const MODIFY_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
        position: "relative"
    },
    image_background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    go_back_icon: {
        position: "absolute",
        alignSelf: "flex-start",
        left: wp("2%"),
        top: hp("0.5%"),
        padding: hp("2%"),
        justifyContent: "center",
        alignItems: "center",
    },
    profile_picture: {
        top: hp("5%"),
        right: wp("27%"),
    },
    profile_picture_container: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.7,
        borderColor: "lightgrey",
        borderRadius: 150,
    },
    bottom_section: {
        height: hp("85%"),
        paddingTop: hp("5%"),
        alignItems: "center",
    },
    label_name: {
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "lightgrey",
        padding: hp("2%"),
        alignItems: "center",
    },
    text_label: {
        fontSize: hp(2),
        fontWeight: "bold",
        color: "lightgrey",
    },
    text_input: {
        fontSize: hp(2.5),
        fontWeight: "300",
        color: "lightgrey",
        paddingStart: 25,
    },
})