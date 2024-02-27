import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { blackThemeSecondary } from '../../../../assets/color/color';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../../context/AuthProvider';
import Header from '../../../components/other/header/Header';
import NotFound from '../../../components/other/not_found/NotFound';

const ContactScreen = ({ navigation }) => {

    const [contacts, setContacts] = useState([]);
    const [isScreenLoading, setIsScreenLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: blackThemeSecondary }}>
            <Header screenTitle="Contacts" />
            {
                contacts.length == 0 ?
                    <>
                        <NotFound subject={"contact"} />
                    </> :

                    <>
                        <Text>ContactScreen</Text>
                    </>
            }



        </View>
    )
}

export default ContactScreen