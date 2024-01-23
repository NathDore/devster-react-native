import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import { useAuthContext } from '../../../../context/AuthProvider';
import { useForm, Controller } from 'react-hook-form';
import { FORM_STYLESHEET } from '../Form_Styles/style';

const RegisterForm = () => {
    const { openRegisterForm } = useAuthContext();
    const { control, handleSubmit, formState: { isValid } } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {/* Modal */}
            <View style={FORM_STYLESHEET.modal}>

                {/*Close icon*/}
                <TouchableOpacity
                    style={FORM_STYLESHEET.closeIcon}
                    onPress={openRegisterForm}
                >
                    <Icon name="close" type="fontAwesome" color={"black"} />
                </TouchableOpacity>

                {/* Form */}
                <View style={FORM_STYLESHEET.form}>
                    {/* Title */}
                    <Text style={FORM_STYLESHEET.title}>Join us now.</Text>

                    {/* Name Field */}
                    <Controller
                        control={control}
                        render={({ field, fieldState }) => (
                            <View style={FORM_STYLESHEET.field}>
                                <Text style={FORM_STYLESHEET.labelText}>Name:</Text>
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
                            required: 'Name is required', pattern: {
                                value: /^[A-Za-z]+$/,
                                message: 'Invalid name format. Only letters are allowed.',
                            },
                        }}
                    />


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
                        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
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

        </View>
    )
}

export default RegisterForm