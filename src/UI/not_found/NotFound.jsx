import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const NotFound = ({ subject, }) => {

    const handleRenderIcon = () => {
        switch (subject) {
            case "publication":
                return (<FontAwesome5Icon name="poll-h" color={"lightgrey"} size={55} />)
            case "contact":
                return (<FontAwesome5Icon name="user-friends" size={55} color={"lightgrey"} />)
            case "conversation":
                return (<AwesomeIcon name="comment" color={"lightgrey"} size={55} />)
            default:
                return;
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <View style={{ marginVertical: "3%" }}>
                <View style={{ position: "absolute", bottom: "55%", left: "18%" }}>
                    <Icon name="search" size={50} color="lightgrey" />
                </View>

                <View>
                    {handleRenderIcon()}
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "lightgrey", marginHorizontal: "5%" }}>No {subject} found yet.</Text>
            </View>

        </View>
    )
}

export default NotFound