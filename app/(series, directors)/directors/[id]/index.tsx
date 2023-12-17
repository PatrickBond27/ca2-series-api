import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
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
    <>
        <Text>{director.full_name}</Text>
        <Text>ID of series: {director.series}</Text>
        <Text>{director.email}</Text>
        <Text>{error}</Text>
    </>
  );
}