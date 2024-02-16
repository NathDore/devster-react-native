import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { LOGIN_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" });
    const [showPassword, setShowPassword] = useState(false);
    const { handleSignInWithEmailAndPassword } = useAuthContext();

    const onSubmit = (data) => {
        handleSignInWithEmailAndPassword(data.email, data.password);
        navigation.navigate("WelcomeBack");
    };

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleRenderButton = () => {
        return isValid ?
            (<TouchableOpacity
                style={LOGIN_STYLESHEET.submit_button_valid}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={LOGIN_STYLESHEET.submit_button_valid_text}>Log in</Text>
            </TouchableOpacity>)
            :
            (<View
                style={LOGIN_STYLESHEET.submit_button_invalid}
            >
                <Text style={LOGIN_STYLESHEET.submit_button_invalid_text}>Log in</Text>
            </View>)
    }

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }


    return (
        <KeyboardAvoidingView style={LOGIN_STYLESHEET.keyboardAvoidingView}>
            <ScrollView>
                {/* header */}
                <View style={LOGIN_STYLESHEET.header}>
                    <TouchableOpacity style={{ padding: wp("2%") }} onPress={handleGoBack}>
                        <AwesomeIcon name="angle-left" size={hp(5)} color="white" />
                    </TouchableOpacity>
                    <View />
                </View>

                {/* title container */}
                <View style={LOGIN_STYLESHEET.title_container}>
                    {/* title */}
                    <Text style={LOGIN_STYLESHEET.title}>Let's sign you in.</Text>
                    {/* subtitle */}
                    <Text style={LOGIN_STYLESHEET.subtitle}>Welcome back</Text>
                </View>

                {/* Email Field */}
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <View style={LOGIN_STYLESHEET.field}>
                                <TextInput
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    style={LOGIN_STYLESHEET.textInput}
                                    placeholderTextColor="lightgrey"
                                    placeholder='Email' />
                            </View>
                            {fieldState.error && <Text style={LOGIN_STYLESHEET.error}>{fieldState.error.message}</Text>}
                        </>

                    )}
                    name="email"
                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
                />

                {/* Password field */}
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <View style={LOGIN_STYLESHEET.field}>
                                <TextInput
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    secureTextEntry={!showPassword}
                                    style={LOGIN_STYLESHEET.textInput}
                                    placeholderTextColor="lightgrey"
                                    placeholder='Password' />

                                <Pressable onPress={handleShowPassword}>
                                    <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ marginEnd: wp(4) }} size={hp(3)} color="lightgrey" />
                                </Pressable>
                            </View>
                            {fieldState.error && <Text style={LOGIN_STYLESHEET.error}>{fieldState.error.message}</Text>}
                        </>


                    )}
                    name="password"
                    rules={{
                        required: 'Password is required',
                    }}
                />

                <View style={{ height: 50 }} />

                {/* Submit button */}
                {
                    handleRenderButton()
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen