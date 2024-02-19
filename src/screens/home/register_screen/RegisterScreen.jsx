import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { REGISTER_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegisterScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" });
    const { handleSignUpWithEmailAndPassword } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        handleSignUpWithEmailAndPassword(data.email, data.password, data.username);
        navigation.navigate("Welcome");
    };

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleRenderButton = () => {
        return isValid ?
            (<TouchableOpacity
                style={REGISTER_STYLESHEET.submit_button_valid}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={REGISTER_STYLESHEET.submit_button_valid_text}>Sign up</Text>
            </TouchableOpacity>)
            :
            (<View
                style={REGISTER_STYLESHEET.submit_button_invalid}
            >
                <Text style={REGISTER_STYLESHEET.submit_button_invalid_text}>Sign up</Text>
            </View>)
    }


    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }
    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={REGISTER_STYLESHEET.container}>
            <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <View style={{ top: hp("10%") }}>
                    {/* header */}
                    <View style={REGISTER_STYLESHEET.header}>
                        <TouchableOpacity style={{ padding: wp("2%") }} onPress={handleGoBack}>
                            <AwesomeIcon name="angle-left" size={hp(5)} color="white" />
                        </TouchableOpacity>
                        <View />
                    </View>

                    {/* title container */}
                    <View style={REGISTER_STYLESHEET.title_container}>
                        {/* title */}
                        <Text style={REGISTER_STYLESHEET.title}>Why Not Sign up ?</Text>
                        {/* subtitle */}
                        <Text style={REGISTER_STYLESHEET.subtitle}>Lets get you in</Text>
                    </View>

                    {/* Username Field */}
                    <Controller
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <View style={REGISTER_STYLESHEET.field}>
                                    <TextInput
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        style={REGISTER_STYLESHEET.textInput}
                                        placeholderTextColor="lightgrey"
                                        placeholder='Username' />

                                </View>
                                {fieldState.error && <Text style={REGISTER_STYLESHEET.error}>{fieldState.error.message}</Text>}
                            </>

                        )}
                        name="username"
                        rules={{
                            required: 'Username is required', maxLength: {
                                value: 20,
                                message: "Name must be under 21 characters long"
                            }
                        }}
                    />

                    {/* Email Field */}
                    <Controller
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <View style={REGISTER_STYLESHEET.field}>
                                    <TextInput
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        style={REGISTER_STYLESHEET.textInput}
                                        placeholderTextColor="lightgrey"
                                        placeholder='Email' />

                                </View>
                                {fieldState.error && <Text style={REGISTER_STYLESHEET.error}>{fieldState.error.message}</Text>}
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
                                <View style={REGISTER_STYLESHEET.field}>
                                    <TextInput
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        secureTextEntry={!showPassword}
                                        style={REGISTER_STYLESHEET.textInput}
                                        placeholderTextColor="lightgrey"
                                        placeholder='Password' />

                                    <Pressable style={REGISTER_STYLESHEET.show_password_container} onPress={handleShowPassword}>
                                        <Icon name={showPassword ? 'eye' : 'eye-slash'} style={{ marginEnd: wp(4) }} size={hp(3)} color="lightgrey" />
                                    </Pressable>
                                </View>
                                {fieldState.error && <Text style={REGISTER_STYLESHEET.error}>{fieldState.error.message}</Text>}
                            </>


                        )}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long'
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Your password must containt at least one lowercase letter, one uppercase letter, one digit and one special character among @$!%*?&',
                            },
                        }}
                    />

                    <View style={{ height: hp(3) }} />

                    {/* Submit button */}
                    {
                        handleRenderButton()
                    }
                </View>

            </KeyboardAvoidingView>
        </Pressable>
    )
}

export default RegisterScreen