import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { useSession } from '../../../../contexts/AuthContext';
import { DirectorType } from '../../../../types/index.d';

export default function Page() {
  const { session, isLoading } = useSession();
  const [director, setDirector] = useState<any>(null);
  const [error, setError] = useState("");
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState<DirectorType>({
    full_name: "",
    email: "",
    series: ""
  });
  
  useEffect(() => {
    navigation.setOptions({ title:"Edit Director" });
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
          setForm(response.data);
        })
        .catch(e => {
            console.error(e);
            setError(e.response.data.message);
        });
  }, []);

  if(isLoading) return <Text>Loading...</Text>;

  if(!director) return <Text>{error}</Text>;


  const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form);

        axios.put(`https://ca1-directors-api-app.vercel.app/api/directors/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                router.push(`/directors/${id}`);  
             })
             .catch(e => {
                console.error(e);
                setError(e.response.data.message);
             });

        // axios.put(`https://directors-api.vercel.app/api/directors/${id}`, form, {
        //     headers: {
        //         Authorization: `Bearer ${session}`
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //         setDirector(response.data);
        //     })
        //     .catch(e => {
        //         console.error(e);
        //         setError(e.response.data.message);
        //     });
    };

  return (
    <>
        <Text>Full Name</Text>
        <TextInput 
            style={styles.input}
            placeholder='Full Name'
            onChange={handleChange}
            value={form.full_name}
            id="full_name"
        />

        <Text>Email</Text>
        <TextInput 
            style={styles.input}
            placeholder='Email'
            onChange={handleChange}
            value={form.email}
            id="email"
        />

        <Text>Series</Text>
        <TextInput 
            style={styles.input}
            placeholder='Series'
            onChange={handleChange}
            value={form.series}
            id="series"
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