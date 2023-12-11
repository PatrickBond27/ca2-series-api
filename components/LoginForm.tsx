import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from '../contexts/AuthContext';
import { LoginFormType } from '../types/index.d'

export default function LoginForm(){
    const { signIn } = useSession();

    const [form, setForm] = useState<LoginFormType>({
        email: "",
        password:""
    });
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log("clicked", form);

        axios.post('https://ca1-series-api-app.vercel.app/api/users/login', form, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
             .then(response => {
                console.log(response.data);
                signIn(response.data.token);
             })
             .catch(e => {
                // console.error(e);
                setError(e.response.data.message);
             });
    };

    return (
        <>
            <TextInput 
                style={styles.input}
                placeholder='Email'
                onChange={handleChange}
                value={form.email}
                id="email"
            />
            <TextInput 
                style={styles.input}
                placeholder='Password'
                onChange={handleChange}
                value={form.password}
                id="password"
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