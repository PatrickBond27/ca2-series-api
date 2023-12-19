import axios from 'axios';
import { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { useSession } from '../../../contexts/AuthContext';
import { DirectorType } from '../../../types/index.d';

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState<DirectorType>({
    full_name: "",
    email: "",
    series: ""
  });

  useEffect(() => {
    navigation.setOptions({ title:"Directors" });
  }, [navigation]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.inputTitle}>Full Name</Text>
        <TextInput 
            style={styles.input}
            placeholder='Full Name'
            onChange={handleChange}
            value={form.full_name}
            id="full_name"
        />

        <Text style={styles.inputTitle}>Email</Text>
        <TextInput 
            style={styles.input}
            placeholder='Email'
            onChange={handleChange}
            value={form.email}
            id="email"
        />

        <Text style={styles.inputTitle}>Series</Text>
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
            style={styles.submitButton}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f', // Dark Navy
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    width: '80%',
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    marginVertical: 8,
    width: '40%', // Adjust the width as needed
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});