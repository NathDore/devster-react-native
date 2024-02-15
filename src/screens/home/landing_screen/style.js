import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";

export const LANDING_STYLESHEET = StyleSheet.create({
    section: {
        height: "50%"
    },
    title: {
        marginTop: "32%",
        color: "white",
        alignSelf: "center",
        fontSize: 55,
        fontWeight: "bold",
    },
    subtitle: {
        color: "white",
        alignSelf: "center",
        fontSize: 15,
        fontWeight: "500",
        letterSpacing: 1,
    },
    contact_container: {
        flexDirection: "column",
        justifyContent: "center",
        marginVertical: "10%",
    },
    contact_button_container: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: "5%",
    },
    contact_text: {
        alignSelf: "center",
        color: "white",
        fontSize: 15,
    },
    contact_button: {
        marginHorizontal: "2%",
        width: 50,
        height: 50,
        backgroundColor: blackThemeSecondary,
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    description_container: {
        width: "90%",
        alignSelf: "center",
    },
    description_text: {
        textAlign: "center",
        color: "grey",
        letterSpacing: 0.8,
    },
    create_account_button: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: blackThemeSecondary,
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: "white",
        marginVertical: "10%",
        padding: "5%",
    },
    create_account_button_text: {
        color: "white",
        fontSize: 18,
        fontWeight: "300",
    },
    sign_in_button: {
        alignSelf: "center",
        padding: "3%",
    },
    sign_in_button_text: {
        color: "white",
        fontSize: 20,
    }
})