import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements';
import { MODIFY_SCREEN_STYLESHEET } from './style';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider';

const ModifyScreen = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [userData, setUserData] = useState({});

    const { user } = useAuthContext();

    useEffect(() => {
        getUserDoc(user?.uid);
    }, [])

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
        });

        task.then(async () => {
            const downloadURL = await reference.getDownloadURL();
            console.log('Image uploaded to the bucket!');
            console.log('Download URL:', downloadURL);

            sendDownloadURLToFirestore(downloadURL, userId);
        })
    };


    const getUserDoc = (userId) => {
        firestore()
            .collection("users")
            .doc(userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUserData(doc.data());
                };
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const sendDownloadURLToFirestore = (downloadURL, userId) => {
        firestore()
            .collection("users")
            .doc(userId)
            .set({
                ...userData,
                profile_picture: downloadURL,
            })
            .then(() => {
                console.log("image upload to firestore");
            })
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
                    <Avatar
                        size={90}
                        rounded
                        source={userData?.profile_picture ? { uri: userData?.profile_picture } : require('../../../../../../assets/anonyme_profile.jpg')}
                    />

                    {/* Modify button */}
                    <TouchableOpacity style={MODIFY_SCREEN_STYLESHEET.modify_button} onPress={pickImageAsync}>
                        <Text style={MODIFY_SCREEN_STYLESHEET.modify_button_text}>Modifiy picture</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={MODIFY_SCREEN_STYLESHEET.bottom_section}>

                {/* Modifify username section */}
                <View style={MODIFY_SCREEN_STYLESHEET.username_section}>
                    <TextInput style={MODIFY_SCREEN_STYLESHEET.username_text_input} placeholder='Modify your username here.' />
                </View>
            </View>
        </View>
    )
}

export default ModifyScreen