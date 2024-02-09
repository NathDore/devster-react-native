import { View, Text, TouchableOpacity, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { useAuthContext } from '../../../../context/AuthProvider';
import { useForm, Controller } from 'react-hook-form';
import { FORM_STYLESHEET } from '../Form_Styles/style';

const RegisterForm = () => {
    const { openRegisterForm, handleSignUp, firebaseError } = useAuthContext();
    const { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        handleSignUp(data.email, data.password);
    };

    return (
        <KeyboardAvoidingView style={FORM_STYLESHEET.container}>

            {/* Modal */}
            <View style={FORM_STYLESHEET.modal}>

                {/*Close icon*/}
                <TouchableOpacity
                    style={FORM_STYLESHEET.closeIcon}
                    onPress={openRegisterForm}
                >
                    <Icon name="close" type="fontAwesome" color={"white"} />
                </TouchableOpacity>

                {/* Form */}
                <View style={FORM_STYLESHEET.form}>
                    {/* Title */}
                    <Text style={FORM_STYLESHEET.title}>Join us now.</Text>

                    <View style={{ height: 100 }} />

                    <View>
                        {/* Email Field */}
                        <Controller
                            control={control}
                            render={({ field, fieldState }) => (
                                <View style={FORM_STYLESHEET.field}>
                                    <Text style={FORM_STYLESHEET.labelText}>Email:</Text>
                                    <TextInput
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        style={FORM_STYLESHEET.userInput}
                                        placeholder='Email address?'
                                        placeholderTextColor={"lightgrey"}
                                    />
                                    {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
                                </View>
                            )}
                            name="email"
                            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
                        />

                        {
                            firebaseError && <View style={{ width: "100%", alignItems: "center" }}><Text style={{ color: 'red' }}>{firebaseError}</Text></View>
                        }

                        {/* Password field */}
                        <Controller
                            control={control}
                            render={({ field, fieldState }) => (
                                <View style={FORM_STYLESHEET.field}>
                                    <Text style={FORM_STYLESHEET.labelText}>Password:</Text>
                                    <TextInput
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        secureTextEntry
                                        placeholder='*****************'
                                        placeholderTextColor={"lightgrey"}
                                        style={FORM_STYLESHEET.userInput}
                                    />
                                    {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
                                </View>
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
                    </View>

                    <View style={{ height: 100 }} />
                    {/* Submit button */}
                    {
                        isValid ? <Pressable style={FORM_STYLESHEET.validButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={FORM_STYLESHEET.textButton}>Register</Text>
                        </Pressable> : <View style={FORM_STYLESHEET.invalidButton}>
                            <Text style={FORM_STYLESHEET.textButton}>Register</Text>
                        </View>
                    }


                </View>


            </View>

        </KeyboardAvoidingView>
    )
}

export default RegisterForm