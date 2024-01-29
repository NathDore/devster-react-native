import { View, Text, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements';
import { MODIFY_SCREEN_STYLESHEET } from './style';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider';

const ModifyScreen = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const { user, userData, isProfileLoading,
        setIsProfileLoading } = useAuthContext();

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
            setIsProfileLoading(true);
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
                setIsProfileLoading(false);
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
    }

    return (
        <View style={MODIFY_SCREEN_STYLESHEET.container}>
            {/* Image background Header */}
            <ImageBackground
                source={userData?.profile_picture ? { uri: userData?.profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                blurRadius={15}
                style={MODIFY_SCREEN_STYLESHEET.image_background}
            >
                <View style={MODIFY_SCREEN_STYLESHEET.profile_picture}>

                    {/* Profile picture */}

                    {
                        isProfileLoading ? <ActivityIndicator size={'small'} color={"blue"} /> : <Avatar
                            size={90}
                            rounded
                            source={userData?.profile_picture ? { uri: userData?.profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                        />
                    }

                    {/* Modify button */}
                    <TouchableOpacity style={MODIFY_SCREEN_STYLESHEET.modify_button} onPress={pickImageAsync}>
                        <Text style={MODIFY_SCREEN_STYLESHEET.modify_button_text}>Modifiy picture</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={MODIFY_SCREEN_STYLESHEET.bottom_section}>

                <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", marginVertical: "5%" }}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>{userData?.name}</Text>
                </View>

                {/* Modifify username section */}
                <View style={MODIFY_SCREEN_STYLESHEET.username_section}>
                    <TextInput style={MODIFY_SCREEN_STYLESHEET.username_text_input} placeholder='Modify your username here.' onChangeText={(text) => setUsernameInput(text)} value={usernameInput} />
                </View>

                {
                    usernameInput ? <TouchableOpacity style={{ marginVertical: "5%" }} onPress={handleUpdateName}><Text style={{ color: "white", fontSize: 20 }}>OK</Text></TouchableOpacity> : null
                }
            </View>
        </View>
    )
}

export default ModifyScreen