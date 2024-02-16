import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NotFound = ({ subject, }) => {

    const handleRenderIcon = () => {
        switch (subject) {
            case "publication":
                return (<FontAwesome5Icon name="poll-h" color={"lightgrey"} size={hp(5)} />)
            case "contact":
                return (<FontAwesome5Icon name="user-friends" size={hp(5)} color={"lightgrey"} />)
            case "conversation":
                return (<AwesomeIcon name="comment" color={"lightgrey"} size={hp(5)} />)
            default:
                return;
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <View style={{ marginVertical: hp("1%") }}>
                <View style={{ position: "absolute", bottom: hp("5%"), left: wp("8%") }}>
                    <Icon name="search" size={hp(5)} color="lightgrey" />
                </View>

                <View>
                    {handleRenderIcon()}
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "lightgrey", marginHorizontal: wp("5%"), fontSize: hp(2.5) }}>No {subject} found yet.</Text>
            </View>

        </View>
    )
}

export default NotFound