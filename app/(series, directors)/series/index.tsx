import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button, View, StyleSheet } from 'react-native';
import { Link, useRouter, useNavigation } from 'expo-router';
import SerieItem from '../../../components/SerieItem';

export default function Page() {
  const [series, setSeries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title:"All Series" });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ca1-series-api-app.vercel.app/api/series')
         .then(response => {
          console.log(response.data);
          setSeries(response.data);
         })
         .catch(e => {
            console.error(e);
         });

  }, []);

  const onDelete = (id?: string) => {
    let newSeries = series.filter((serie: any) => serie._id !== id);
    setSeries(newSeries);
  }

  const rowData = series.reduce((acc, curr, index) => {
    const rowIndex = Math.floor(index / 4);
    if (!acc[rowIndex]) {
        acc[rowIndex] = [];
    }
    acc[rowIndex].push(curr);
    return acc;
  }, []);

  // return (
  // <FlatList
  //     data={series}
  //     numColumns={4}
  //     renderItem={({item}) => 
  //       <View style={styles.card}>
  //         <SerieItem serie={item} />
  //       </View>
  //     }
  //     keyExtractor={item => item.id}
  //     contentContainerStyle={styles.container} />
  // );

  return (
    <FlatList
        data={rowData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: rows }) => (
            <View style={styles.row}>
              {rows.map(item => (
                <View style={styles.card} key={item._id}>
                    <SerieItem serie={item} onDelete={onDelete} />
                </View>
              ))}
            </View>
        )} horizontal={false} // Set for horizontal scrolling
        contentContainerStyle={styles.container}
    />
  );

  // return (
  //   <View style={styles.container}>
  //       {series.map((serie: any) => (
  //           <View style={styles.card} key={serie._id}>
  //               <SerieItem serie={serie} onDelete={onDelete} />
  //           </View>
  //       ))}
  //   </View>
  // );

  // let seriesList = series.map((serie: any) => {
  //   return <SerieItem key={serie._id} serie={serie} onDelete = {onDelete} />
  // });

  // return (
  //   <>
  //   {seriesList}

  //   {/* <Text>This is the view all series page</Text> */}

  //   {/* <FlatList
  //       data={series}
  //       renderItem={({item}) => <Item title={item.title} />}
  //       keyExtractor={item => item.id}
  //     /> */}


  //   {/* <Link href={{
  //       pathname: '/series/[id]',
  //       params: { id: '655ad700774516d9ce8b4770' }
  //   }}>Frozen Planet</Link>

  //   <Link href={{
  //       pathname: '/series/[id]',
  //       params: { id: '655ad700774516d9ce8b4771' }
  //   }}>Planet Earth: The Complete Collection</Link>

  //   <Link href={{
  //       pathname: '/series/[id]',
  //       params: { id: '655ad700774516d9ce8b4772' }
  //   }}>The Blue Planet: Natural History of the Oceans</Link> */}
  //   </>
  // );
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePlaceholder: {
      width: '100%',
      height: 200,
      backgroundColor: '#ccc', // Placeholder background color
      borderRadius: 8,
      marginBottom: 8,
  },
  createButton: {
    backgroundColor: '#287b28', // Dark Green background color for 'edit' button
    width: 200, // Make 'edit' button more narrow
    marginBottom: 40, // Add margin spacing
  },
});