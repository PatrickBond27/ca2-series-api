import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import LoginForm from '../components/LoginForm';

import { useSession } from '../contexts/AuthContext';

export default function Page() {
  const { session, signOut } = useSession();

  return (
    <>
    <View style={styles.container}>
    <Text style={styles.title}>SeriesBoxd</Text>
      {(!session) ? <LoginForm /> : (
        <>
          <View style={styles.loggedInContainer}>
              <Link href={'/series'} asChild>
                <View style={styles.seriesButton} >
                  <Button title='All series' color='#287b28' />
                </View>
              </Link>
              <Link href={'/directors'} asChild>
                <View style={styles.directorsButton} >
                  <Button title='All directors' color='#287b28' />
                </View>
              </Link>
              <Text style={styles.loggedInText}>You are logged in</Text>
                <View style={styles.logoutButton} >
                  <Button onPress={signOut} title='Logout' color='#FFA500'/>
                </View>
          </View>
        </>
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#001F3F', // Dark navy background
      padding: 16,
  },
  title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#57FF0E', // Green text color
      marginBottom: 20,
  },
  seriesButton: {
    margin: 15,
    color: '#287b28', // Dark Green text color
    width: 180,
  },
  directorsButton: {
    margin: 30,
    color: '#287b28', //  Green text color
    width: 180,
  },
  logoutButton: {
    margin: 20,
    color: '#FFA500', // Orange text color
    width: 150,
  },
  loggedInContainer: {
      alignItems: 'center',
  },
  loggedInText: {
      fontSize: 18,
      color: '#FFA500', // Orange text color
      marginTop: 10,
      marginBottom: 10,
  },
});