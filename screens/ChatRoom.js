import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react'

const ChatRoom = () => {
  return (
    <GiftedChat
			messages={messages}
			onSend={sendMessages}
      listViewProps={{style: {backgroundColor: "#666"} }}
			user={{_id: auth.currentUser?.uid, name: auth.currentUser?.email}}
		/>
  )
}

export default ChatRoom

const styles = StyleSheet.create({})