import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { useAuthContext } from '../../../../context/AuthProvider';
import { FORM_STYLESHEET } from '../Form_Styles/style';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
    const { openLoginForm, signIn } = useAuthContext();
    const { control, handleSubmit, formState: { isValid } } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        //Log the user in and close the form
        signIn();
        openLoginForm();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
                        name="name"
                        rules={{
                            required: 'Name is required'
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

        </View>
    )
}

export default LoginForm