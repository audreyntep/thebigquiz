import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import Dashboard from "./screens/Dashboard";
import { Provider } from 'react-redux'
import Store from './store/configStore'
const Stack = createStackNavigator();

const App = () => {
  return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LeGrandQuiz" component={HomeScreen} options={{ tabBarLabel: 'Quiz' }}/>
              <Stack.Screen name="Quizscreen" component={QuizScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

export default App;
