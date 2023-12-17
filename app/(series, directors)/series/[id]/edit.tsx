import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import { SerieType } from '../../../../types/index.d';

export default function Page() {
  const { session, isLoading } = useSession();
  const [serie, setSerie] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState<SerieType>({
    title: "",
    description: "",
    directors: "",
    release_year: "",
    rating: ""
  });

  useEffect(() => {
    navigation.setOptions({ title:"Edit" });
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
          setForm(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!serie) return <Text>{error}</Text>;


  const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form);

        axios.put(`https://ca1-series-api-app.vercel.app/api/series/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                router.push(`/series/${id}`);  
             })
             .catch(e => {
                console.error(e);
                setError(e.response.data.message);
             });

        // axios.put(`https://series-api.vercel.app/api/series/${id}`, form, {
        //     headers: {
        //         Authorization: `Bearer ${session}`
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //         setSerie(response.data);
        //     })
        //     .catch(e => {
        //         console.error(e);
        //         setError(e.response.data.message);
        //     });
    };

  return (
    <>
        <Text>Title</Text>
        <TextInput 
            style={styles.input}
            placeholder='Title'
            onChange={handleChange}
            value={form.title}
            id="title"
        />

        <Text>Description</Text>
        <TextInput 
            style={styles.input}
            placeholder='Description'
            onChange={handleChange}
            value={form.description}
            id="description"
        />

        <Text>Directors</Text>
        <TextInput 
            style={styles.input}
            placeholder='Directors'
            onChange={handleChange}
            value={form.directors}
            id="directors"
        />

        <Text>Release Year</Text>
        <TextInput 
            style={styles.input}
            placeholder='Release Year'
            onChange={handleChange}
            value={form.release_year}
            id="release_year"
        />

        <Text>Rating</Text>
        <TextInput 
            style={styles.input}
            placeholder='Rating'
            onChange={handleChange}
            value={form.rating}
            id="rating"
        />

        <Text>{error}</Text>
        
        <Button
            onPress={handleClick}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
    </>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });