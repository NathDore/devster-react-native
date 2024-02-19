import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider';
import { ADD_COMMENT_STYLESHEET } from "./style"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
        <View>
            <View style={isFocus ? ADD_COMMENT_STYLESHEET.focus_container : ADD_COMMENT_STYLESHEET.container}>
                <TextInput
                    style={{
                        flex: 1,
                        width: wp("80%"),
                        paddingTop: isFocus ? hp(2) : hp(0),
                        paddingStart: wp(4),
                        color: 'white',
                        fontSize: hp(2.5),
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
                    <FontAwesome name="paper-plane" size={hp(3)} color="lightgrey" />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default AddComment