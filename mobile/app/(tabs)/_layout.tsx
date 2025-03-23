import { Tabs } from 'expo-router';
import { Image } from 'react-native';
export default function Layout() {
    return (
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused ,color, size }) => (
                <Image
                source={require('../../assets/home.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#A5A1F5' : '#888',
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="dream"
          options={{
            title: 'Dream',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/dream.png')}
                style={{
                    width: 20,
                    height: 20,
                  tintColor: focused ? '#A5A1F5' : '#888',
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="game"
          options={{
            title: 'Game',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/game.png')}
                style={{
                    width: 20,
                    height: 20,
                  tintColor: focused ? '#A5A1F5' : '#888',
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="story"
          options={{
            title: 'Story',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/story.png')}
                style={{
                    width: 20,
                    height: 20,
                  tintColor: focused ? '#A5A1F5' : '#888',
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/profile.png')}
                style={{
                    width: 20,
                    height: 20,
                  tintColor: focused ? '#A5A1F5' : '#888',
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>     
       
    );

  }
