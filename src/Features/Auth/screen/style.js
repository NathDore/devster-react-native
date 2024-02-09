import { StyleSheet } from "react-native";
import { blackTheme, blackThemeSecondary } from "../../../../assets/color/color";

export const LANDING_SCREEN_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    footer_image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    content: {
        paddingLeft: "5%",
    },
    title_container: {
        marginVertical: "2.5%",
    },
    title_text: {
        color: "white",
    },
    subtitle_container: {
        marginVertical: "2.5%",
    },
    subtitle_text: {
        color: "lightgrey",
        fontSize: 15,
    },
    see_publication_button_container: {
        marginVertical: "2.5%",
    },
    see_publication_button: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: blackTheme,
        width: 150,
        paddingHorizontal: "5%",
        paddingVertical: "3%",
        borderRadius: 30,
    },
    publication_button_text: {
        color: "white",
    },
    content_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content_form: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        width: "100%",
        height: "98%",
        borderRadius: 5,
        backgroundColor: blackThemeSecondary,
    },
    contact_section: {
        width: "100%",
        alignItems: "center",
    },
    contact_us_text: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        letterSpacing: 1,
        marginBottom: "3%",
    },
    contact_button_container: {
        flexDirection: "row",
        marginBottom: "3%",
    },
    github_button: {
        marginHorizontal: "1%",
    },
    gmail_button: {
        marginHorizontal: "1%",
    },
    login_button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        width: 250,
        paddingHorizontal: "6%",
        paddingVertical: "3%",
        borderRadius: 30,
        marginVertical: "2%",
        borderWidth: 0.7,
        borderColor: "white",
    },
    login_button_text: {
        color: "white",
    },
    register_button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        width: 250,
        paddingHorizontal: "6%",
        paddingVertical: "3%",
        borderRadius: 10,
        marginVertical: "2%",
        borderWidth: 0.5,
        borderColor: blackThemeSecondary,
        elevation: 2,
    },
    register_button_text: {
        color: "white",
    },
    description_container: {
        padding: "2%",
        backgroundColor: blackTheme,
        marginVertical: "5%",
        justifyContent: "center",
        borderRadius: 10,
        width: "80%",
        elevation: 2,
    },
    description_text: {
        color: "white",
        fontSize: 15,
        letterSpacing: 0.5,
    },
});