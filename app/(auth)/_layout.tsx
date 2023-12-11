import { Text } from 'react-native';
import { Slot, Redirect } from 'expo-router';
import Footer from '../../components/Footer';

import { useSession } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { session, isLoading } = useSession(); 

  if(isLoading){
    return <Text>Loading...</Text>;
  }

  if(!session){
    return <Redirect href='/' />
  }
  
  return (
    <>
        <Slot />
        <Footer />
    </>
  );
}