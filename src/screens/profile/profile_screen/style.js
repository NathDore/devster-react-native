import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PROFILE_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202124",
        display: "flex",
        flexDirection: "column",
    },
    backIcon: {
        marginVertical: hp("2%"),
        marginHorizontal: wp("5%"),
    },
    topSection: {
        justifyContent: "flex-start",
        width: "100%",
        alignItems: "center",
    },
    profile_picture: {
        marginTop: hp("1%"),
        marginBottom: hp("1%"),
    },
    modify_button: {
        borderWidth: 1,
        elevation: 1,
        backgroundColor: "black",
        width: wp(30),
        borderColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: hp("1%"),
        marginTop: hp("1%"),
        marginBottom: hp("2%"),
    },
    button_text: {
        color: "white",
    },
    username: {
        fontSize: hp(3),
        fontWeight: "bold",
        color: "white",
    },
    bottom_section: {
        flex: 1,
        backgroundColor: "#00000080",
        borderTopWidth: 0.5,
        borderColor: "lightgrey",
    },
    bottom_header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: hp(5),
        backgroundColor: "rgba(8, 8, 8, 0.91)",
        paddingStart: hp("2%"),
    },
    publication_title_header_text: {
        color: "white",
        fontSize: hp(2),
        fontWeight: "400",
    },
    publication_title_header_underline: {
        borderBottomWidth: 1,
        borderColor: "lightblue",
    },

})