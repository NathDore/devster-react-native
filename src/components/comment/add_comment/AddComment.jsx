import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider';
import { ADD_COMMENT_STYLESHEET } from "./style"

const AddComment = ({ postId }) => {
    const [commentText, setCommentText] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const { user } = useAuthContext();

    const handleSubmit = () => {
        firestore()
            .collection('comments')
            .add({
                content: commentText,
                postId: postId,
                userId: user.uid,
                timestamp: new Date().getTime()
            })
            .then(() => {
                console.log("Comment added.");
                setCommentText("");
                setIsFocus(false);
            })
            .catch((error) => console.log("Error while sending comment."))
    };

    const handleOnFocus = () => {
        setIsFocus(true);
    }

    const handleOnBlur = () => {
        setIsFocus(false);
    }

    return (
        <View style={isFocus ? ADD_COMMENT_STYLESHEET.focus_container : ADD_COMMENT_STYLESHEET.container}>
            <TextInput
                style={{
                    flex: 1,
                    width: "80%",
                    paddingTop: isFocus ? 15 : 5,
                    paddingStart: 10.5,
                    color: 'white',
                    fontSize: 18,
                    textAlignVertical: isFocus ? 'top' : 'center'
                }}
                placeholder='Enter your comment here.'
                placeholderTextColor={'white'}
                multiline
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChangeText={(text) => setCommentText(text)}
                value={commentText}
            />

            <TouchableOpacity onPress={handleSubmit} style={ADD_COMMENT_STYLESHEET.submit_button}>
                <FontAwesome name="paper-plane" size={24} color="lightblue" />
            </TouchableOpacity>
        </View>
    )
}

export default AddComment