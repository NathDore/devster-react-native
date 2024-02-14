import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Pressable, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { CREATE_POST_STYLESHEET } from './style';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider';

const CreatePost = ({ setIsModalOpen }) => {
    const [userInput, setUserInput] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuthContext()

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
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
                handleCloseModal();
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
        <Pressable onPress={handleCloseKeyboard} style={CREATE_POST_STYLESHEET.container}>
            {/* Modal */}
            <View style={CREATE_POST_STYLESHEET.flex1}>
                {
                    isLoading ? <ActivityIndicator size={"large"} color={"lightgrey"} style={{ alignSelf: "center" }} /> :
                        <>
                            <View style={CREATE_POST_STYLESHEET.buttonSection}>
                                <TouchableOpacity onPress={handleCloseModal}>
                                    <Icon name="close" type="fontAwesome" color={"lightgrey"} size={40} />
                                </TouchableOpacity>
                                {
                                    renderValidButton()
                                }
                            </View>


                            <View style={CREATE_POST_STYLESHEET.flex1}>
                                <TextInput
                                    multiline
                                    placeholder='Enter text here'
                                    placeholderTextColor={"lightgrey"}
                                    onChangeText={(text) => setUserInput(text)}
                                    value={userInput}
                                    style={CREATE_POST_STYLESHEET.textInput}
                                />
                            </View>

                        </>


                }
            </View>
        </Pressable>
    )
}

export default CreatePost