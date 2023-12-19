import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
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
    series: "",
  });
  
  useEffect(() => {
    navigation.setOptions({ title: "Edit Director" });
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


  // const handleChange = (id: keyof SerieType, value: string) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = async () => {
        console.log(form);

        axios.put(`https://ca1-series-api-app.vercel.app/api/directors/${id}`, form, {
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
        
        <View style={styles.submitButton}>
        <Button
            onPress={handleClick}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        </View>
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
    borderRadius: 8,
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