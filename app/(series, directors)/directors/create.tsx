import axios from 'axios';
import { useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext';
import { DirectorType } from '../../../types/index.d';

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState<DirectorType>({
    full_name: "",
    email: "",
    series: ""
  });

  if(isLoading) return <Text>Loading...</Text>;

  const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form);

        axios.post(`https://ca1-series-api-app.vercel.app/api/directors/`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
             .then(response => {
                console.log(response.data);
                router.push(`/directors/${response.data._id}`);  
             })
             .catch(e => {
                console.error(e);
                setError(e.response.data.message);
             });
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