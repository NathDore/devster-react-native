import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import React from 'react'
import LoginForm from '../../components/login_form/LoginForm';
import { useAuthContext } from '../../../../context/AuthProvider';
import RegisterForm from '../../components/register_form/RegisterForm';

const LandingScreen = () => {
    const { isLoginForm, isRegisterForm } = useAuthContext();

    return (
        <View style={{ flex: 1, backgroundColor: "#202124" }}>

            {/* Login Modal */}
            <Modal
                isVisible={isLoginForm}
            >
                <LoginForm />
            </Modal>

            {/* Register Modal */}
            <Modal
                isVisible={isRegisterForm}
            >
                <RegisterForm />
            </Modal>

            <ScrollView>

                {/* Image */}
                <Image
                    source={require("../../../../../assets/topImage.jpg")}
                    style={{
                        width: '100%',
                        height: 75,
                        resizeMode: 'cover',
                    }}
                />

                {/* Content */}
                <View style={{ paddingLeft: "5%" }}>

                    <View style={{ marginVertical: "2.5%" }}>
                        <Text h3={true} h3Style={{ color: "white" }}>Welcome Devster.</Text>
                    </View>

                    <View style={{ marginVertical: "2.5%" }}>
                        <Text style={{ color: "grey", fontSize: 15 }}> the best app for juniors who want to start their carrer.</Text>
                    </View>

                    <View style={{ marginVertical: "2.5%" }}>
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#000", width: 150, paddingHorizontal: "6%", paddingVertical: "3%", borderRadius: 30 }}>
                            <Text numberOfLines={1} style={{ color: "white" }}>See publications</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>

    )
}

export default LandingScreen