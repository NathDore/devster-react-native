import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from '../../../context/AuthProvider';

const AddComment = ({ postId }) => {
    const [commentText, setCommentText] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const { user } = useAuthContext()

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

    return (
        <View style={isFocus ? {
            backgroundColor: "#202124",
            width: "100%",
            height: "30%",
            marginVertical: "2%",
            borderColor: '#d1d0d059',
            borderWidth: 0.5,
        } : {
            backgroundColor: "#202124",
            width: "100%",
            height: "10%",
            marginVertical: "2%",
            borderColor: '#d1d0d059',
            borderWidth: 0.5,
        }}>
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
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={(text) => setCommentText(text)}
                value={commentText}
            />

            <TouchableOpacity onPress={handleSubmit} style={{ position: 'absolute', alignSelf: "flex-end", marginRight: "5%", marginTop: "5%" }}>
                <FontAwesome name="paper-plane" size={24} color="lightblue" />
            </TouchableOpacity>
        </View>
    )
}

export default AddComment