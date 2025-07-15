import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePost from './createPost';

const Stack = createStackNavigator();

export default function CreateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
}
