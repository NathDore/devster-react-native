import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../assets/color/color";

export const REGISTER_STYLESHEET = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        padding: "5%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header_title: {
        color: "white",
        fontSize: 20,
    },
    title_container: {
        width: "100%",
        padding: "10%",
    },
    title: {
        color: "white",
        fontSize: 25,
        letterSpacing: 0.2,
    },
    subtitle: {
        color: "lightgrey",
        fontSize: 20,
        letterSpacing: 0.5,
    },
    field: {
        width: "90%",
        borderWidth: 0.5,
        borderColor: "lightgrey",
        height: 50,
        alignSelf: "center",
        borderRadius: 18,
        marginVertical: "5%",
    },
    textInput: {
        color: "lightgrey",
        fontSize: 20, flex: 1,
        paddingStart: 15,
    },
    error: {
        color: 'red',
        alignSelf: "center",
        textAlign: "center"
    },
    submit_button_valid: {
        width: "90%",
        backgroundColor: "lightgrey",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "5%",
        padding: "5%",
        borderRadius: 18,
    },
    submit_button_valid_text: {
        color: blackThemeSecondary,
        fontSize: 20,
    },
    submit_button_invalid: {
        width: "90%",
        borderWidth: 0.5,
        borderColor: "lightgrey",
        backgroundColor: blackThemeSecondary,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "5%",
        padding: "5%",
        borderRadius: 18,
    },
    submit_button_invalid_text: {
        color: "white",
        fontSize: 20,
    }
})