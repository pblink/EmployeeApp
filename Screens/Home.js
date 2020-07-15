import React, {useEffect, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import {Mycontext} from '../App';
// import {useSelector, useDispatch} from 'react-redux';

function Home({navigation}) {
  // const dispatch = useDispatch();
  // const {data, loading} = useSelector(state => {
  //   return state;
  // });
  // const [data, setData] = useState('');
  // const [loading, setLoading] = useState(true);
  const {state, dispatch} = useContext(Mycontext);
  const {data, loading} = state;
  const fetchData = useCallback(() => {
    fetch('http://0c3d79024c2e.ngrok.io/')
      .then(res => res.json())
      .then(result => {
        // setData(result);
        // setLoading(false);
        dispatch({type: 'ADD_DATA', data: result, loading: false});
      });
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const renderList = item => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => {
          navigation.navigate('Profile', {item});
        }}>
        <View style={styles.cardView}>
          <Image style={styles.image} source={{uri: item.imageSource}} />
          <View>
            <Text>{item.name}</Text>
            <Text>{item.stand}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchData()}
        refreshing={loading}
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return renderList(item);
        }}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  myCard: {
    backgroundColor: '#edece6',
    margin: 5,
    padding: 5,
  },

  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
