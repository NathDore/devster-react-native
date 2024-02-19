import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const VISIT_PROFILE_STYLESHEET = StyleSheet.create({
    container: {
        backgroundColor: blackThemeSecondary,
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    navigation_banner: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: hp("1%"),
        alignItems: "center",
        justifyContent: "space-between",
    },
    go_back_icon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 150,
    },
    more_option_icon: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 150,
        backgroundColor: "black"
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingStart: "2%",
        paddingTop: "2%",
        paddingBottom: "1%",
    },
    info_banner: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    info_profile_picture: {
        justifyContent: "center",
        alignItems: "center",
        width: 71,
        height: 71,
        borderWidth: 0.5,
        borderRadius: 150,
        borderColor: "black",
    },
    name: {
        marginHorizontal: "5%",
        color: "white",
        fontSize: hp(3.5),
        fontWeight: "bold",
        maxWidth: '80%',
    },
    button_container: {
        direction: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: hp("2%"),
    },
    add_contact_button: {
        width: wp(30),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "white",
        padding: "1.5%",
        borderRadius: 15,
        backgroundColor: "black",
        elevation: 1,
    },
    add_contact_button_text: {
        color: "white",
        fontSize: hp(1.8)
    },
    send_message_button: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "white",
        padding: "1.5%",
        borderRadius: 15,
        backgroundColor: "black",
        elevation: 1,
        width: wp(30),
        marginHorizontal: "1%",
    },
    send_message_button_text: {
        color: "white",
        fontSize: hp(1.8)
    },
    banner: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        paddingVertical: "3%",
        paddingStart: "3%",
        alignItems: "center",
    },
    section_title_container: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: "lightgrey",
        marginHorizontal: "2%",
        justifyContent: "center",
        alignItems: "center",
    },
    section_title_text: {
        color: "lightgrey",
        fontSize: hp(2),
    }
});