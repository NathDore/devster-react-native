import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Avatar } from 'react-native-elements';

const ProfileScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#202124",
        }}>
            {/* Icon */}
            <TouchableOpacity>
                <AwesomeIcon name="angle-left" size={30} color="white" style={{ marginVertical: "2%", marginHorizontal: "5%" }} />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
                <View style={{ justifyContent: "flex-start", width: "30%", alignItems: "center" }}>
                    {/* Profile picture */}
                    <View style={{ marginTop: "5%", marginBottom: "2%" }}>
                        <Avatar
                            size={100}
                            rounded
                            source={require("../../../../../../assets/profile-image.jpg")}
                        />
                    </View>

                    {/* Modify button */}
                    <TouchableOpacity style={{ borderWidth: 1, elevation: 1, backgroundColor: "black", width: 90, borderColor: "white", borderRadius: 20, justifyContent: "center", alignItems: "center", padding: "5%", marginTop: "5%" }}>
                        <Text style={{ color: "white" }}>Modifiy</Text>
                    </TouchableOpacity>

                    {/* Username */}
                    <Text style={{ marginVertical: "5%", fontSize: 25, fontWeight: "bold", color: "white" }}>Mickey05</Text>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "#00000080", marginTop: "5%" }}>
                {/* Publications sections */}
                <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", height: 40, backgroundColor: "rgba(8, 8, 8, 0.91)", paddingStart: "5%" }}>
                    <View style={{ borderBottomWidth: 1, borderColor: "lightblue" }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "400" }}>Publications</Text>
                    </View>
                </View>

                {/* Publications feed */}
            </View>

        </View>
    )
}

export default ProfileScreen