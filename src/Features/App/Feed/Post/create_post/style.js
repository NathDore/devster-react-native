import { StyleSheet } from "react-native";
import { blackThemeSecondary, blackTheme } from "../../../../../../assets/color/color";

export const CREATE_POST_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackTheme,
        padding: "5%",
        justifyContent: "space-between",
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "lightgrey"
    },
    flex1: {
        flex: 1,
    },
    buttonSection: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    validPublishButton: {
        backgroundColor: "blue",
        width: 100,
        height: 30,
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: "lightgrey",
        backgroundColor: blackThemeSecondary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
    },
    validTextPublishButton: {
        color: "white",
    },
    invalidPublishButton: {
        backgroundColor: "grey",
        width: 100,
        height: 30,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
    },
    textInput: {
        color: "lightgrey",
        justifyContent: "flex-start",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: "5%",
        marginHorizontal: "2%",
        flex: 1,
        textAlignVertical: "top",
    }
})