import { StyleSheet } from "react-native";

export const BACKGROUND_VIDEO_STYLESHEET = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
});