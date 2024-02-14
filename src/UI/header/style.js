import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../assets/color/color";

export const HEADER_STYLESHEET = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        padding: "5%",
        alignItems: "center",
        paddingStart: "5%",
        backgroundColor: blackThemeSecondary,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 25,
        color: "lightgrey",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});