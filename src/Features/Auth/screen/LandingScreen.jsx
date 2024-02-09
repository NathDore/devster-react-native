import { View, ScrollView, Image, TouchableOpacity, VirtualizedList } from 'react-native'
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import React from 'react'
import LoginForm from '../components/login_form/LoginForm';
import { useAuthContext } from '../../../context/AuthProvider';
import RegisterForm from '../components/register_form/RegisterForm';
import { LANDING_SCREEN_STYLESHEET } from './style';
import BackgroundVideo from '../components/background_video/BackgroundVideo';
import { blackTheme, blackThemeSecondary } from '../../../../assets/color/color';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const LandingScreen = () => {
    const { isLoginForm, isRegisterForm, openRegisterForm, openLoginForm } = useAuthContext();

    const handleRegisterForm = () => {
        openRegisterForm();
    };

    const handleLoginForm = () => {
        openLoginForm();
    };

    return (
        /* Container */
        <View style={LANDING_SCREEN_STYLESHEET.container}>

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

            <View style={{ borderBottomWidth: 1, backgroundColor: "#161719", padding: "5%" }}>
                {/* Header */}
                <View style={LANDING_SCREEN_STYLESHEET.content}>

                    {/* Title container */}
                    <View style={LANDING_SCREEN_STYLESHEET.title_container}>
                        {/* Title text */}
                        <Text h3={true} h3Style={LANDING_SCREEN_STYLESHEET.title_text}>Welcome To Devster.</Text>
                    </View>

                    {/* Subtitle container */}
                    <View style={LANDING_SCREEN_STYLESHEET.subtitle_container}>

                        {/* Subtitle text */}
                        <Text style={LANDING_SCREEN_STYLESHEET.subtitle_text}> the best app for juniors dev to cummunicate.</Text>
                    </View>

                    {/* Publication button container */}
                    <View style={LANDING_SCREEN_STYLESHEET.see_publication_button_container}>
                        {/* Publication button */}
                        <TouchableOpacity
                            onPress={handleRegisterForm}
                            style={LANDING_SCREEN_STYLESHEET.see_publication_button}>
                            {/* Publication button text */}
                            <Text numberOfLines={1} style={LANDING_SCREEN_STYLESHEET.publication_button_text}>See publications</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Background video */}
                <BackgroundVideo />
            </View>

            {/* Content container */}
            <View style={LANDING_SCREEN_STYLESHEET.content_container}>

                {/* Content form */}
                <View style={LANDING_SCREEN_STYLESHEET.content_form}>

                    {/* Contact section */}
                    <View style={LANDING_SCREEN_STYLESHEET.contact_section}>
                        {/* Contact Us Text */}
                        <Text style={LANDING_SCREEN_STYLESHEET.contact_us_text}>Contact us: </Text>

                        {/* Contact button container */}
                        <View style={LANDING_SCREEN_STYLESHEET.contact_button_container}>
                            {/* Github button */}
                            <TouchableOpacity>
                                <FontAwesomeIcon name="github" size={35} color="white" style={LANDING_SCREEN_STYLESHEET.github_button} />
                            </TouchableOpacity>

                            {/* Gmail button */}
                            <TouchableOpacity>
                                <MaterialIcon name="email" size={35} color="white" style={LANDING_SCREEN_STYLESHEET.gmail_button} />
                            </TouchableOpacity>
                        </View>

                    </View>


                    {/* Login button */}
                    <TouchableOpacity
                        style={LANDING_SCREEN_STYLESHEET.login_button}
                        onPress={handleLoginForm}
                    >
                        <Text style={LANDING_SCREEN_STYLESHEET.login_button_text}>Login</Text>
                    </TouchableOpacity>

                    <Text style={{ color: "white", fontSize: 10 }}>OR</Text>

                    {/* Register button */}
                    <TouchableOpacity
                        style={LANDING_SCREEN_STYLESHEET.register_button}
                        onPress={handleRegisterForm}
                    >
                        <Text style={LANDING_SCREEN_STYLESHEET.register_button_text}>Join Us</Text>
                    </TouchableOpacity>

                    {/* Description text */}
                    {/*   <View style={LANDING_SCREEN_STYLESHEET.description_container}>
                        <Text style={LANDING_SCREEN_STYLESHEET.description_text}>Our application is a dynamic platform that provides a comprehensive experience to users. With secure authentication through Firebase, users can create and share posts, engage in real-time communication through an integrated chat system, and interact with the community through post comments. With a smooth interface and essential features, our application offers a friendly and engaging space for communication and sharing within your community.</Text>
                    </View> */}

                </View>

            </View>

            {/* Footer */}
            <View style={{
                borderTopWidth: 1
            }}>


                {/* Footer Image */}
                <Image
                    source={require("../../../../assets/footer_image.jpg")}
                    style={LANDING_SCREEN_STYLESHEET.footer_image}
                />
            </View>
        </View >

    )
}

export default LandingScreen