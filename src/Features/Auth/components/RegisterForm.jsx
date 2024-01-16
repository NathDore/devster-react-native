import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { useAuthContext } from '../../../context/AuthProvider';

const RegisterForm = () => {
    const { openRegisterForm } = useAuthContext();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: "70%", backgroundColor: "white", padding: "5%" }}>
                <TouchableOpacity
                    style={{ borderWidth: 1, width: 25 }}
                    onPress={openRegisterForm}
                >
                    <Icon name="close" type="fontAwesome" color={"black"} />
                </TouchableOpacity>

                <Text style={{ color: "black" }}>RegisterForm</Text>
            </View>

        </View>
    )
}

export default RegisterForm