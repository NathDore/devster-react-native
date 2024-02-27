import React from 'react';
import { Video } from 'expo-av';
import { View } from 'react-native';
import source from "../../../../assets/video/video_background.mp4";
import { BACKGROUND_VIDEO_STYLESHEET } from './style';

const BackgroundVideo = () => {
    return (
        <View style={BACKGROUND_VIDEO_STYLESHEET.container}>
            <Video
                source={source}
                style={BACKGROUND_VIDEO_STYLESHEET.video}
                resizeMode="cover"
                isLooping={true}
                shouldPlay
            />
            <View style={{ backgroundColor: "black", flex: 1, opacity: 0.5 }}></View>
        </View>
    )
}

export default BackgroundVideo