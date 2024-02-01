import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useModalContext } from '../../../../../context/ModalProvider'
import { Icon } from 'react-native-elements';
import { CREATE_POST_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../../../context/AuthProvider';

const CreatePost = () => {
    const { setIsCreateModalOpen } = useModalContext();
    const [userInput, setUserInput] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, } = useAuthContext()

    const handleCloseCreatePostModal = () => {
        setIsCreateModalOpen(false);
    }

    const handleSubmit = () => {
        createPublication();
    }

    const createPublication = () => {
        setIsLoading(true);

        firestore()
            .collection("posts")
            .doc()
            .set({
                content: userInput,
                userId: user?.uid,
                timestamp: new Date().getTime(),
            })
            .then(() => {
                console.log("publication created.")
                handleCloseCreatePostModal();
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (userInput) setIsValid(true)
        else setIsValid(false)
    }, [userInput])

    const renderValidButton = () => {

        const button = isValid ?
            <TouchableOpacity
                onPress={handleSubmit}
                style={CREATE_POST_STYLESHEET.validPublishButton}>
                <Text style={CREATE_POST_STYLESHEET.validTextPublishButton}>Pubish</Text>
            </TouchableOpacity>
            :
            <View style={CREATE_POST_STYLESHEET.invalidPublishButton}>
                <Text>Pubish</Text>
            </View>

        return button
    }

    return (
        <View style={CREATE_POST_STYLESHEET.container}>
            {/* Modal */}
            <View style={CREATE_POST_STYLESHEET.flex1}>
                {
                    isLoading ? <ActivityIndicator size={"large"} color={"blue"} /> :
                        <>
                            <View style={CREATE_POST_STYLESHEET.buttonSection}>
                                <TouchableOpacity onPress={handleCloseCreatePostModal}>
                                    <Icon name="close" type="fontAwesome" color={"black"} size={40} />
                                </TouchableOpacity>
                                {
                                    renderValidButton()
                                }
                            </View>


                            <View style={CREATE_POST_STYLESHEET.flex1}>
                                <TextInput
                                    multiline
                                    placeholder='Enter text here'
                                    placeholderTextColor={"black"}
                                    onChangeText={(text) => setUserInput(text)}
                                    value={userInput}
                                    style={CREATE_POST_STYLESHEET.textInput}
                                />
                            </View>

                        </>


                }
            </View>
        </View>
    )
}

export default CreatePost