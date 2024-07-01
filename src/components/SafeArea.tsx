import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

const SafeArea = ({ children, className }: { children: ReactNode, className?: string }) => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaProvider>
            <View 
                style={{
                    flex: 1,
                    marginTop: insets.top,
                }}
                className={className}
            >
                { children }
            </View>
        </SafeAreaProvider>
    );
};

export default SafeArea;