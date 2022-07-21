import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ChatScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.innerContainer}>
            <Image style={{width: 50, height: 50}} source={require('../assets/profile-image.jpg')}/>
            <TouchableOpacity>
            <View>
                <Text>chat display</Text>
            </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 25,
    marginTop: '20%',
    
  }
});

export default ChatScreen;