import axios from 'axios';
import { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, Text, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSession } from '../../../contexts/AuthContext';
import { SerieType } from '../../../types/index.d';

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        let uri = result.assets[0].uri;
        setImage(uri);
        // let uri = result.assets[0].uri;
        // uri = uri.replace("file://", "");
        // const parts = uri.split("/");
        // setImage(uri);
        // const fileName = parts[parts.length - 1];

        // setImagePath(fileName);
        // const fileName = uri.split('/').pop();

        // console.log('image', image);

        // setSelectedImage(result.uri);
        // setForm(prevState => ({
        //     ...prevState,
        //     image: result.uri,
        // }));
    }
  };

  const [form, setForm] = useState<SerieType>({
      title: "",
      description: "",
      directors: "",
      release_year: "",
      rating: "",
      image: null,
    });
    
    useEffect(() => {
      navigation.setOptions({ title: "Series" });
    }, [navigation]);

  if(isLoading) return <Text>Loading...</Text>;

  const handleChange = (id: keyof SerieType, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // const handleChange = (e: any) => {
  //       setForm(prevState => ({
  //           ...prevState,
  //           [e.target.id]: e.target.value
  //       }));
  //   };

    // const handleChange = (id: string, value: string) => {
    //         setForm(prevState => ({
    //             ...prevState,
    //             [id]: value,
    //         }));
    //     };



    const handleClick = async () => {
      try {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (key === 'image' && value) {
            // If 'image' is present and not null, append it as a file
            formData.append(key, {
              uri: value,
              name: 'image.jpg', // You may want to use a more descriptive name
              type: 'image/jpg', // Adjust the type based on the image type
            });
          } else {
            formData.append(key, value);
          }
        });
  
        const response = await axios.post(
          'https://ca1-series-api-app.vercel.app/api/series/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${session}`,
            },
          }
        );
  
        console.log(response.data);
        router.push(`/series/${response.data._id}`);
      } catch (e) {
        console.error(e);
        setError(e.response?.data?.message || 'An error occurred');
      }
    };




    // const handleClick = () => {
    //     console.log(form);

    //     // const formData = new FormData();
    //     // Object.keys(form).forEach(key => {
    //     //     formData.append(key, form[key]);
    //     // });

    //     const formData = new FormData();
    //     Object.entries(form).forEach(([key, value]) => {
    //       if (key === 'image' && value) {
    //         // If 'image' is present and not null, append it as a file
    //         formData.append(key, {
    //           uri: value,
    //           name: 'image.jpg', // You may want to use a more descriptive name
    //           type: 'image/jpg', // Adjust the type based on the image type
    //         });
    //       } else {
    //         formData.append(key, value);
    //       }
    //     });

    //     axios.post(`https://ca1-series-api-app.vercel.app/api/series/`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${session}`
    //         }
    //     })
    //          .then(response => {
    //             console.log(response.data);
    //             router.push(`/series/${response.data._id}`);  
    //          })
    //          .catch(e => {
    //             console.error(e);
    //             setError(e.response.data.message);
    //          });
    // };

  return (
    <>
        <Text>Title</Text>
        <TextInput 
            style={styles.input}
            placeholder='Title'
            onChangeText={(text) => handleChange("title", text)}
            value={form.title}
            id="title"
        />

        <Text>Description</Text>
        <TextInput 
            style={styles.input}
            placeholder='Description'
            onChangeText={(text) => handleChange("description", text)}
            value={form.description}
            id="description"
        />

        <Text>Directors</Text>
        <TextInput 
            style={styles.input}
            placeholder='Directors'
            onChangeText={(text) => handleChange("directors", text)}
            value={form.directors}
            id="directors"
        />

        <Text>Release Year</Text>
        <TextInput 
            style={styles.input}
            placeholder='Release Year'
            onChangeText={(text) => handleChange("release_year", text)}
            value={form.release_year}
            id="release_year"
        />

        <Text>Rating</Text>
        <TextInput 
            style={styles.input}
            placeholder='Rating'
            onChangeText={(text) => handleChange("rating", text)}
            value={form.rating}
            id="rating"
        />

        <Text>Image</Text>
        <Button title="Pick an image for the series" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

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