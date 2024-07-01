import { Button, Pressable, Text, TextInput } from "react-native";
import SafeArea from "../components/SafeArea";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { clearAuthState, selectAuth } from "../features/auth/authSlice";
import { login } from "../features/auth/authAction";

const LoginScreen = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);

    const [email, setEmail] = useState("fahdilabib@gmail.com");
    const [password, setPassword] = useState("password");

    useEffect(() => {
        dispatch(clearAuthState());
    }, []);

    return (
        <SafeArea
            className="m-16"
        >
            <StatusBar style="dark" />
            <LottieView
                style={{
                    width: 300,
                    height: 300,
                    alignSelf: "center",
                }}
                source={require("../../assets/lottieLogin.json")}
                autoPlay
                loop
            />
            <TextInput
                className="p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                className="p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Text className="text-center mb-4">Status: {auth.status}</Text>
            {auth.error !== null
                && <Text className="text-center text-red-500 mb-4">{auth.error}</Text>
            }
            <Pressable
                className="bg-blue-500 p-2 rounded-md active:bg-blue-700"
                onPress={() => {
                    if (!email || !password) {
                        console.log("Email or password is empty");
                        return;
                    }

                    dispatch(login({ email, password }));
                }}
            >
                <Text className="text-white text-center">Login</Text>
            </Pressable>
        </SafeArea>
    );
};

export default LoginScreen;