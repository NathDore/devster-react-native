import { View, Text, TouchableOpacity, TextInput, Pressable, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { useAuthContext } from '../../../../context/AuthProvider';
import { FORM_STYLESHEET } from '../Form_Styles/style';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

const LoginForm = () => {
    const { openLoginForm, signInWithEmailAndPassword, firebaseError } = useAuthContext();
    const { control, handleSubmit, formState: { isValid } } = useForm();

    const onSubmit = async (data) => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={FORM_STYLESHEET.container}>

            {/* Modal */}
            <View style={FORM_STYLESHEET.modal}>

                <TouchableOpacity
                    style={FORM_STYLESHEET.closeIcon}
                    onPress={openLoginForm}
                >
                    <Icon name="close" type="fontAwesome" color={"black"} />
                </TouchableOpacity>

                {/* Form */}
                <View style={FORM_STYLESHEET.form}>
                    {/* Title */}
                    <Text style={FORM_STYLESHEET.title}>Login in.</Text>

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
                                />
                                {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                        name="email"
                        rules={{
                            required: 'email is required'
                        }}
                    />

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
                                    style={FORM_STYLESHEET.userInput}
                                />
                                {fieldState.error && <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>}
                            </View>
                        )}
                        name="password"
                        rules={{
                            required: 'Password is required',
                        }}
                    />

                    {
                        firebaseError && <View style={{ width: "100%", alignItems: "center", marginVertical: "1%" }}><Text style={{ color: 'red' }}>{firebaseError}</Text></View>
                    }

                    {/* Submit button */}
                    {
                        isValid ? <Pressable style={FORM_STYLESHEET.validButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={FORM_STYLESHEET.textButton}>Login</Text>
                        </Pressable> : <View style={FORM_STYLESHEET.invalidButton}>
                            <Text style={FORM_STYLESHEET.textButton}>Login</Text>
                        </View>
                    }

                </View>

            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginForm