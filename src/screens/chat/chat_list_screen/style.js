import { StyleSheet } from "react-native";
import { blackThemeSecondary } from "../../../../assets/color/color";

export const CHAT_LIST_SCREEN = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blackThemeSecondary,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        padding: "5%",
        alignItems: "center",
        paddingStart: "5%",
    }
});