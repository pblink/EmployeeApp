import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

function CreateStandUser({navigation, route}) {
  const getDetails = type => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'stand':
          return route.params.stand;
        case 'phone':
          return route.params.phone;
        case 'salary':
          return route.params.salary;
        case 'mail':
          return route.params.stand;
        case 'imageSource':
          return route.params.imageSource;
      }
    } else {
      return '';
    }
  };

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [salary, setSalary] = useState(getDetails('salary'));
  const [mail, setMail] = useState(getDetails('mail'));
  const [stand, setStand] = useState(getDetails('stand'));
  const [imageSource, setImageSource] = useState(getDetails('imageSource'));
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const submitHandler = () => {
    fetch('http://0c3d79024c2e.ngrok.io/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        mail,
        stand,
        salary,
        imageSource: imageSource.uri,
      }),
    })
      .then(r => r.json())
      .then(data => {
        Alert.alert(`${data.name} is saved successfully.`);
        navigation.navigate('Home');
      });
  };
  const updateHandler = () => {
    fetch('http://0c3d79024c2e.ngrok.io/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: route.params.id,
        name,
        phone,
        mail,
        stand,
        salary,
        imageSource,
      }),
    })
      .then(r => r.json())
      .then(updatedEmp => {
        Alert.alert(`${updatedEmp.name} is updated successfully.`);
        navigation.navigate('Home');
      })
      .catch(err => Alert.alert('something wrong'));
  };

  const uploadHandler = image => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'StandApp');
    data.append('cloud_name', 'dn2lgibpf');
    return fetch('https://api.cloudinary.com/v1_1/dn2lgibpf/image/upload', {
      method: 'post',
      body: data,
    }).then(res => res.json());
  };
  const options = {noData: true, quality: 0.2};
  function pickFromCamera() {
    ImagePicker.launchCamera(options, response => {});
  }
  function pickFromGallery() {
    ImagePicker.launchImageLibrary(options, response => {
      setSpinner(true);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
        setModal(false);
        uploadHandler({
          uri: response.uri,
          name: 'test.jpg',
          type: response.type,
        })
          .then(({url}) => {
            setImageSource({uri: url});
            setSpinner(false);
          })
          .catch(() => {
            setSpinner(false);
          });
      }
    });
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput
          style={styles.input}
          label="Name"
          theme={theme}
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          label="Email"
          theme={theme}
          mode="outlined"
          value={mail}
          onChangeText={text => setMail(text)}
        />
        <TextInput
          style={styles.input}
          label="Phone"
          theme={theme}
          keyboardType="number-pad"
          mode="outlined"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          label="Stand"
          theme={theme}
          mode="outlined"
          value={stand}
          onChangeText={text => setStand(text)}
        />
        <TextInput
          style={styles.input}
          label="Salary"
          theme={theme}
          mode="outlined"
          value={salary}
          onChangeText={text => setSalary(text)}
        />
        <Button
          style={{marginTop: 10}}
          theme={theme}
          icon={imageSource == '' ? 'upload' : 'check'}
          mode="contained"
          onPress={() => setModal(true)}>
          Upload Image
        </Button>
        {route.params ? (
          <Button
            style={{marginTop: 10}}
            theme={theme}
            icon="content-save"
            mode="contained"
            onPress={updateHandler}>
            Update user
          </Button>
        ) : (
          <Button
            style={{marginTop: 10}}
            theme={theme}
            icon="content-save"
            mode="contained"
            onPress={submitHandler}>
            Save
          </Button>
        )}

        <View style={styles.spinnerContainer}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                icon="camera"
                mode="contained"
                theme={theme}
                onPress={() => pickFromCamera()}>
                Camera
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                theme={theme}
                onPress={() => pickFromGallery()}>
                Gallery
              </Button>
            </View>
            <Button
              style={styles.modalButton}
              theme={theme}
              onPress={() => setModal(false)}>
              Back
            </Button>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}
export default CreateStandUser;
const theme = {
  colors: {
    primary: 'blue',
  },
};
const styles = StyleSheet.create({
  container: {},
  input: {
    margin: 5,
  },
  modalButton: {},
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  modalView: {
    position: 'absolute',
    bottom: 150,
    width: '100%',
    backgroundColor: 'white',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
