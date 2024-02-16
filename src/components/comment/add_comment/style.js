import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ADD_COMMENT_STYLESHEET = StyleSheet.create({
    focus_container: {
        backgroundColor: "#202124",
        width: "100%",
        height: hp("10%"),
        marginVertical: hp("2%"),
        borderColor: '#d1d0d059',
        borderWidth: 0.5,
    },
    container: {
        backgroundColor: "#202124",
        width: "100%",
        height: hp("8%"),
        marginVertical: hp("1%"),
        borderColor: '#d1d0d059',
        borderWidth: 0.5,
    },
    submit_button: {
        position: 'absolute',
        alignSelf: "flex-end",
        marginRight: "5%",
        marginTop: "5%",
    },
})