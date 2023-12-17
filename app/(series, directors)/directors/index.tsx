import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button, View, StyleSheet } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import DirectorItem from '../../../components/DirectorItem';

export default function Page() {
  const [directors, setDirectors] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title:"All Directors" });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ca1-series-api-app.vercel.app/api/directors')
         .then(response => {
          console.log(response.data);
          setDirectors(response.data);
         })
         .catch(e => {
            console.error(e);
         });

  }, []);

  const onDelete = (id?: string) => {
    let newDirectors = directors.filter((director: any) => director._id !== id);
    setDirectors(newDirectors);
  }

  let directorsList = directors.map((director: any) => {
    return <DirectorItem key={director._id} director={director} />
  });
  
  return (
    <View style={styles.container}>
    {/* <Text>This is the view all directors page</Text> */}

    <View>
      <View style={styles.createButton} >
        <Button title="Create a new Director" onPress={() => router.push(`/directors/create`)} color='#287b28' />
      </View>
      {directorsList}
    </View>
    
    {/* <FlatList
        data={directors}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}


    {/* <Link href={{
        pathname: '/directors/[id]',
        params: { id: '235641726gfjwhgvfuwf' }
    }}>This is director 1</Link>

    <Link href={{
        pathname: '/directors/[id]',
        params: { id: 'secondblahblah8753842' }
    }}>Second director</Link>

    <Link href={{
        pathname: '/directors/[id]',
        params: { id: '33333333333' }
    }}>Cool director</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#001F3F', // Dark navy background
  },
  card: {
      backgroundColor: '#e4e6eb',
      borderRadius: 8,
      padding: 16,
      marginRight: 16,
      marginBottom: 16,
      elevation: 3, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 1, height: 1 }, // for iOS shadow
      shadowOpacity: 0.3, // for iOS shadow
      shadowRadius: 2, // for iOS shadow
      width: 350,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#287b28', // Dark Green background color for 'edit' button
    width: 200, // Make 'edit' button more narrow
    marginBottom: 40, // Add margin spacing
  },
});