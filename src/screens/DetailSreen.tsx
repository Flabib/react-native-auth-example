import { StatusBar } from "expo-status-bar";
import SafeArea from "../components/SafeArea";
import { Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const DetailScreen = ({ route }: { route: any }) => {
    const { email } = route.params;

    const [name, setName] = useState('-');
    const [bio, setBio] = useState('-');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() =>  {
        const db = getFirestore(app);

        const querySnapshot = getDoc(doc(db, `users/${email}`));
        querySnapshot.then((querySnapshot) => {
            const result = querySnapshot.data();

            setName(result?.name);
            setBio(result?.bio);
        });
    }, []);

    return (
        <SafeArea className="flex-1">
            <StatusBar backgroundColor="#1D4ED8" style="light" />
            <View className="bg-blue-500 p-4 h-28 justify-center">
                <Text className="font-bold p-2 text-white text-center">Selected User:</Text>
                <Text className="text-white text-center">{email}</Text>
            </View>

            <Text className="font-bold pl-4 pt-4">User Details:</Text>
            <View className="p-4 rounded bg-gray-300 m-4">
                <View className="flex flex-row">
                    <Text className="font-bold basis-1/4">Full Name:</Text>
                    <Text className="basis-3/4">{name}</Text>
                </View>
                <View className="flex flex-row mt-2">
                    <Text className="font-bold basis-1/4">Bio:</Text>
                    <Text className="basis-3/4">{bio}</Text>
                </View>
            </View>

            {isEditing && (
                <View>
                    <Text className="font-bold pl-4 pt-4">Edit User:</Text>
                    <View className="p-4 rounded bg-gray-300 m-4">
                        <View className="flex flex-row items-center">
                            <Text className="font-bold basis-1/4">Full Name:</Text>
                            <TextInput className="basis-3/4 mt-0.5" value={name} onChangeText={(text) => setName(text)} />
                        </View>
                        <View className="flex flex-row items-center">
                            <Text className="font-bold basis-1/4">Bio:</Text>
                            <TextInput className="basis-3/4 mt-0.5" value={bio} onChangeText={(text) => setBio(text)} />
                        </View>
                    </View>
                </View>
            )}

            <View className="flex-1 items-center">
                <Pressable
                    className="bg-blue-500 p-2 rounded-md active:bg-blue-700 mt-2"
                    onPress={() => {
                        if (isEditing) {
                            const db = getFirestore(app);

                            updateDoc(doc(db, `users/${email}`), {
                                name: name,
                                bio: bio,
                            });                       
                        }

                        setIsEditing(!isEditing);
                    }}
                >
                    <Text className="text-white">{isEditing ? 'Save' : 'Edit'}</Text>
                </Pressable>
            </View>
        </SafeArea>
    );
};

export default DetailScreen;