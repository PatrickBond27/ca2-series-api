import { Drawer } from 'expo-router/drawer';
import { SessionProvider } from '../contexts/AuthContext'; 

export default function Layout() {
  return (
    <SessionProvider>
        <Drawer>
            <Drawer.Screen 
                name='index'
                options={{
                    drawerLabel: "Home",
                    title: "Home"
                }}
            />
            <Drawer.Screen 
                name='(series)'
                options={{
                    drawerLabel: "Series",
                    title: "Series"
                }}
            />
            <Drawer.Screen 
                name='(directors)'
                options={{
                    drawerLabel: "Directors",
                    title: "Directors"
                }}
            />
        </Drawer>
    </SessionProvider>
  );
}