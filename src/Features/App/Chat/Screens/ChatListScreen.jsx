import { View, Text } from 'react-native'
import React from 'react'
import ChatCard from '../components/chat_card/ChatCard'

const ChatListScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "#202124" }}>
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </View>
    )
}

export default ChatListScreen