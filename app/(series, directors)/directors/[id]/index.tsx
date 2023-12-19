import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Image, View } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';

export default function Page() {
  const { session, isLoading } = useSession();
  const [director, setDirector] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title:"Director" });
  }, [navigation]);

  useEffect(() => {
    axios.get(`https://ca1-series-api-app.vercel.app/api/directors/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
        .then(response => {
          console.log(response.data);
          setDirector(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!director) return <Text>{error}</Text>;


  return (
    <View style={styles.container}>
        <Text style={styles.full_name}>{director.full_name} {director.directors}</Text>
        <Text style={styles.series}>{director.series}</Text>
        <Text style={styles.description}>{director.description}</Text>
        <Text style={styles.email}>{director.email}</Text>
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
  full_name: {
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
  series: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  email: {
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