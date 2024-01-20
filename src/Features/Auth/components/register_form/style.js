import { StyleSheet } from "react-native";

export const REGISTER_FORM_STYLESHEET = StyleSheet.create({
    modal: {
        width: "90%",
        backgroundColor: "white",
        padding: "5%",
        display: "flex",
        flexDirection: "column"
    },
    closeIcon: {
        borderWidth: 1,
        width: 25,
        alignSelf: "flex-end"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        marginVertical: "5%",
    },
    title: {
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "400",
        letterSpacing: 0.5,
        marginVertical: "5%"
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
    textButton: { color: "white", fontSize: 20, fontWeight: "600" },
    labelText: { fontSize: 25, marginBottom: "1%" },
    userInput: {
        fontSize: 20,
        height: 40,
        borderWidth: 0.5,
        padding: 5,
        textAlignVertical: "center",
    },
});