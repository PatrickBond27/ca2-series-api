import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Image, View } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';

export default function Page() {
  const { session, isLoading } = useSession();
  const [serie, setSerie] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title:"Serie" });
  }, [navigation]);

  useEffect(() => {
    axios.get(`https://ca1-series-api-app.vercel.app/api/series/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
        .then(response => {
          console.log(response.data);
          setSerie(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!serie) return <Text>{error}</Text>;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{serie.title}</Text>
      <Text style={styles.description}>{serie.description}</Text>
      <Text style={styles.directors}>ID of directors: {serie.directors}</Text>
      <Text style={styles.releaseYear}>{serie.release_year}</Text>
      <Text style={styles.rating}>{serie.rating}</Text>
      <Text style={styles.image}>{serie.image}</Text>
      {serie.image && ( <Image source={{ uri: serie.image }} style={styles.image} /> )}
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#001f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  description: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  directors: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  releaseYear: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});