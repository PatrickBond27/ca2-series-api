import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
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
    <>
        <Text>{serie.title}</Text>
        <Text>{serie.description}</Text>
        <Text>ID of directors: {serie.directors}</Text>
        <Text>{serie.release_year}</Text>
        <Text>{serie.rating}</Text>
        <Text>{serie.image}</Text>
        <Text>{error}</Text>
    </>
  );
}