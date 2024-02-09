import { StyleSheet } from "react-native";
import { blackThemeSecondary, blackTheme } from "../../../../../assets/color/color";

export const FORM_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        width: "100%",
        backgroundColor: blackTheme,
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        borderWidth: 1,
    },
    closeIcon: {
        borderWidth: 1,
        width: 25,
        alignSelf: "flex-end",
        borderColor: "white",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        marginVertical: "5%",
        flex: 1,
        justifyContent: "space-around",
    },
    title: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "400",
        letterSpacing: 0.5,
        marginVertical: "5%",
        color: "white",
    },
    field: {
        marginHorizontal: "2%",
        marginVertical: "5%",
    },
    validButton: {
        backgroundColor: "blue",
        width: 200,
        height: 40,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: "2%",
    },
    invalidButton: {
        backgroundColor: "grey",
        width: 200,
        height: 40,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: "2%",
    },
    textButton: {
        color: "white",
        fontSize: 20,
        fontWeight: "600"
    },
    labelText: {
        fontSize: 25,
        marginBottom: "1%",
        color: "white",
    },
    userInput: {
        fontSize: 18,
        height: 40,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 5,
        padding: 5,
        textAlignVertical: "center",
    },
});