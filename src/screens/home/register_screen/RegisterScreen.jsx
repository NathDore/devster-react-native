import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { REGISTER_STYLESHEET } from './style';
import { useAuthContext } from '../../../context/AuthProvider';

const RegisterScreen = ({ navigation }) => {
    const { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" });
    const { handleSignUp } = useAuthContext();

    const onSubmit = (data) => {
        handleSignUp(data.email, data.password, data.username);
        navigation.navigate("Home");
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

    return (
        <KeyboardAvoidingView style={REGISTER_STYLESHEET.keyboardAvoidingView}>
            <ScrollView>
                {/* header */}
                <View style={REGISTER_STYLESHEET.header}>
                    <TouchableOpacity style={{ padding: "2%" }} onPress={handleGoBack}>
                        <Icon name="chevron-left" size={20} color="white" />
                    </TouchableOpacity>
                    {/* header title */}
                    <Text style={REGISTER_STYLESHEET.header_title}>Sign up</Text>
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
                    rules={{ required: 'Username is required' }}
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
                                    secureTextEntry
                                    style={REGISTER_STYLESHEET.textInput}
                                    placeholderTextColor="lightgrey"
                                    placeholder='Password' />

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

                <View style={{ height: 50 }} />

                {/* Submit button */}
                {
                    handleRenderButton()
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen