import { StyleSheet } from "react-native";

export const HEADER_STYLESHEET = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: '2%',
        color: "white",
        alignSelf: "center",
    },
    text: {
        fontSize: 13,
    },
    marginHorizontal: {
        marginHorizontal: "10%",
    },
    buttonSignUp: {
        backgroundColor: 'white',
        padding: '2%',
        borderRadius: 15,
        width: 70,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
    },
});