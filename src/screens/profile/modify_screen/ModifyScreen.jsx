import { View, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator, Pressable, Keyboard } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Avatar } from 'react-native-elements';
import { MODIFY_SCREEN_STYLESHEET } from './style';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const ModifyScreen = ({ navigation }) => {
    const [usernameInput, setUsernameInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {
        user,
        userData,
        setIsHeaderShowing
    } = useAuthContext();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            uploadProfilePictureToStorage(result.assets[0].uri, user?.uid);
        } else {
            alert('You did not select any image.');
        }
    };

    const uploadProfilePictureToStorage = async (uri, userId) => {
        const reference = storage().ref(`profilePictures/${userId}`);
        const task = reference.putFile(uri);

        task.on('state_changed', snapshot => {
            console.log(`${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`);
            setIsLoading(true);
        });

        task.then(async () => {
            const downloadURL = await reference.getDownloadURL();
            console.log('Image uploaded to the bucket!');
            console.log('Download URL:', downloadURL);

            sendDownloadURLToFirestore(downloadURL, userId);
        })
    };

    const sendDownloadURLToFirestore = (downloadURL, userId) => {
        if (!userData) {
            console.error("userData is undefined");
            return;
        }

        firestore()
            .collection("users")
            .doc(userId)
            .set({
                ...userData,
                profile_picture: downloadURL,
            })
            .then(() => {
                console.log("image upload to firestore");
                setIsLoading(false);
            })
    }

    const updateNameFirestore = (uid, userData, usernameInput) => {
        firestore()
            .collection("users")
            .doc(uid)
            .set({
                ...userData,
                name: usernameInput,
            })
            .then(() => {
                console.log("Name updated.");
                setUsernameInput("");
            })
            .catch((error) => {
                console.log("error while updating the name.")
            })
    }

    const handleUpdateName = () => {
        updateNameFirestore(user?.uid, userData, usernameInput);
        setUsernameInput("");
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();

        console.log(usernameInput);
        if (!usernameInput) return;
        handleUpdateName();
    }

    const handleUserNameInput = (text) => {
        setUsernameInput(text);
    }

    useFocusEffect(useCallback(() => {
        setIsHeaderShowing(false);
    }, [navigation]))

    return (
        <Pressable onPress={handleCloseKeyboard} style={MODIFY_SCREEN_STYLESHEET.container}>
            {/* Image background Header */}
            <ImageBackground
                source={userData?.profile_picture ? { uri: userData?.profile_picture } : require('../../../../assets/anonyme_profile.jpg')}
                blurRadius={15}
                style={MODIFY_SCREEN_STYLESHEET.image_background}
            >
                {/* Go back icon */}
                <TouchableOpacity onPress={handleGoBack} style={MODIFY_SCREEN_STYLESHEET.go_back_icon}>
                    <FontAwesome name="chevron-left" size={25} color="lightgrey" />
                </TouchableOpacity>

                <View style={MODIFY_SCREEN_STYLESHEET.profile_picture}>

                    {/* Profile picture */}
                    <TouchableOpacity onPress={pickImageAsync} style={MODIFY_SCREEN_STYLESHEET.profile_picture_container}>
                        {isLoading ? <ActivityIndicator size={30} color={"lightgrey"} /> : <Avatar
                            size={100}
                            rounded
                            source={userData?.profile_picture ? { uri: userData?.profile_picture } : require('../../../../assets/anonyme_profile.jpg')}
                        />}
                        <View style={{ position: "absolute" }}>
                            <FontAwesome name="image" size={30} color="lightgrey" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={MODIFY_SCREEN_STYLESHEET.bottom_section}>

                <View style={MODIFY_SCREEN_STYLESHEET.label_name}>
                    <Text style={MODIFY_SCREEN_STYLESHEET.text_label}>Username</Text>
                    <Text style={MODIFY_SCREEN_STYLESHEET.text_label}> : </Text>
                    <TextInput value={usernameInput} onChangeText={handleUserNameInput} multiline={false} style={MODIFY_SCREEN_STYLESHEET.text_input} placeholderTextColor={"lightgrey"} placeholder={userData.name} />
                </View>
            </View>
        </Pressable>
    )
}

export default ModifyScreen