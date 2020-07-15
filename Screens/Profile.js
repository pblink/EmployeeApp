import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Title, Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
function Profile(props) {
  const {
    _id,
    name,
    mail,
    imageSource,
    salary,
    stand,
    phone,
  } = props.route.params.item;
  const deleteHandler = () => {
    fetch('http://0c3d79024c2e.ngrok.io/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then(res => res.json())
      .then(deletedItem => {
        Alert.alert(`${deletedItem.name} is deleted`);
        props.navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('some thing is wrong');
      });
  };
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`).then();
    } else {
      Linking.openURL(`telprompt:${phone}`).then();
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0033ff', '#6bc1ff']}
        style={styles.linearGradient}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: imageSource,
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Title>{name}</Title>
        <Text>Stand user: {stand}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL(`mailto:${mail}`).then();
        }}>
        <View style={styles.cardView}>
          <Icon name="mail" size={32} color={'blue'} />
          <Text style={{marginLeft: 5, fontSize: 19}}>{mail}</Text>
        </View>
      </Card>
      <Card
        style={styles.myCard}
        onPress={() => {
          openDial();
        }}>
        <View style={styles.cardView}>
          <Icon name="phone" size={32} color={'blue'} />
          <Text style={{marginLeft: 5, fontSize: 19}}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardView}>
          <Icon name="attach-money" size={32} color={'blue'} />
          <Text style={{marginLeft: 5, fontSize: 19}}>{salary}</Text>
        </View>
      </Card>
      <View style={styles.buttonView}>
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            props.navigation.navigate('Create', {
              id: _id,
              name,
              mail,
              imageSource,
              salary,
              stand,
              phone,
            });
          }}>
          Account Edit
        </Button>
        <Button
          icon="trash-can"
          theme={theme}
          mode="contained"
          onPress={deleteHandler}>
          Delete User
        </Button>
      </View>
    </View>
  );
}
export default Profile;
const theme = {
  colors: {
    primary: 'blue',
  },
};
const styles = StyleSheet.create({
  root: {
    marginTop: -45,
  },

  linearGradient: {
    height: 150,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: -75,
  },
  imageContainer: {
    alignItems: 'center',
  },
  cardView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myCard: {
    height: 50,
    margin: 3,
  },
  buttonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
