import { StyleSheet } from "react-native";

export const CREATE_POST_STYLESHEET = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: "2%",
        justifyContent: "space-between",
    },
    flex1: {
        flex: 1
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
        color: "black",
        justifyContent: "flex-start",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: "3%",
        marginHorizontal: "2%",
    }
})