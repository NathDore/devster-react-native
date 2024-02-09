import React from 'react';
import { Video } from 'expo-av';
import { StyleSheet, View } from 'react-native';
import source from "../../../../../assets/video_background.mp4";

const BackgroundVideo = () => {
    return (
        <View style={styles.container}>
            <Video
                source={source}
                style={styles.video}
                resizeMode="cover"
                isLooping={true}
                shouldPlay
            />
            <View style={{ backgroundColor: "black", flex: 1, opacity: 0.5 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default BackgroundVideo