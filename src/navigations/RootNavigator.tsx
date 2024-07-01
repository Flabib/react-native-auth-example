import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserNavigator from "./UserNavigator";
import GuestNavigator from "./GuestNavigator";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

const RootNavigator = () => {
    const auth = useAppSelector(selectAuth);
    
    return (
        <NavigationContainer>
            {auth.data.user
                ? <UserNavigator />
                : <GuestNavigator />
            }
        </NavigationContainer>
    );
};

export default RootNavigator;