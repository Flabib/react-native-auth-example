import { Pressable, Text, View } from "react-native";
import SafeArea from "../components/SafeArea";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/auth/authSlice";
import { selectUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { getUsers } from "../features/user/authAction";
import notifee from '@notifee/react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const onDisplayNotification = async () => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: 'Hello, World!',
            body: 'This is a notification!',
            android: {
                channelId,
            },
        });
    };

    return (
        <SafeArea className="flex-1">
            <StatusBar backgroundColor="#1D4ED8" style="light" />
            <View className="bg-blue-500 p-4 h-28 justify-center">
                <Text className="font-bold p-4 text-white text-center">Welcome, {auth.data.user?.name}!</Text>
            </View>

            <View className="p-4">
                {user.data.users.length > 0 &&
                    user.data.users.map((user) => {
                        return (
                            <Pressable
                                className="border border-gray-300 rounded-md mt-2 p-2 active:bg-gray-300 active:text-white"
                                key={user.email}
                                onPress={() => navigation.navigate("Detail", { email: user.email })}
                            >
                                <Text>{user.name}</Text>
                            </Pressable>
                        );
                    })
                }
            </View>

            <View className="flex-1 items-center">
                <Pressable
                    className="bg-blue-500 p-2 rounded-md active:bg-blue-700 mt-2"
                    onPress={() => {
                        onDisplayNotification();
                        console.log('Notification displayed');
                    }}
                >
                    <Text className="text-white">Notification</Text>
                </Pressable>
                <Pressable
                        className="bg-blue-500 p-2 rounded-md active:bg-blue-700 mt-2"
                        onPress={() => dispatch(logout())}
                    >
                        <Text className="text-white">Logout</Text>
                </Pressable>
            </View>
        </SafeArea>
    );
};

export default HomeScreen;