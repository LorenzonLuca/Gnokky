import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import GNTextInput from '../GN/GNTextInput';
import FirebaseUtils from '../Models/FirebaseUtils';
import { useEffect, useState } from 'react';
import { COLORS } from '../Models/Globals';
import ContactList from '../GN/ContactList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


export default function SearchPage({ navigation }) {
    const { t } = useTranslation();

    const [research, setResearch] = useState("");
    const [listUsers, setListUsers] = useState([]);
    const [listHistory, setListHistory] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const setupAsyncStorageHistory = async () => {
            try {
                const value = await AsyncStorage.getItem('history1');
                if (value === null) {
                    await AsyncStorage.setItem('history1', "");
                    await AsyncStorage.setItem('history2', "");
                    await AsyncStorage.setItem('history3', "");
                    await AsyncStorage.setItem('history4', "");
                    await AsyncStorage.setItem('history5', "");
                } else {
                    console.log("async storage doesn't need the setup");
                }
            } catch (e) {
                console.log("Error while setup async storage ", error);
            }
        }

        setupAsyncStorageHistory();
    }, [])

    useEffect(() => {
        if (research) {
            setShowHistory(false);
            if (research !== "") {
                const lowerResearch = research.toLowerCase();
                FirebaseUtils.findUserFromSearchBar(lowerResearch)
                    .then((result) => {
                        console.log("Badola", result);
                        setListUsers(result);
                    })
            }
        } else {
            setShowHistory(true);
            setListUsers([]);
        }
    }, [research])

    useEffect(() => {
        if (showHistory) {
            const getHistory = async () => {
                try {
                    const history5 = await AsyncStorage.getItem('history5');
                    const history4 = await AsyncStorage.getItem('history4');
                    const history3 = await AsyncStorage.getItem('history3');
                    const history2 = await AsyncStorage.getItem('history2');
                    const history1 = await AsyncStorage.getItem('history1');

                    setListHistory([history1, history2, history3, history4, history5]);
                } catch (e) {
                    console.log("Error while getting async storage ", error);
                }
            }

            getHistory();
        }
    }, [showHistory])

    const handleResearch = (inputText) => {
        setResearch(inputText);
    }

    const handleHistory = async (username) => {
        try {
            const history4 = await AsyncStorage.getItem('history4');
            const history3 = await AsyncStorage.getItem('history3');
            const history2 = await AsyncStorage.getItem('history2');
            const history1 = await AsyncStorage.getItem('history1');


            await AsyncStorage.setItem('history5', history4);
            await AsyncStorage.setItem('history4', history3);
            await AsyncStorage.setItem('history3', history2);
            await AsyncStorage.setItem('history2', history1);
            await AsyncStorage.setItem('history1', username);

        } catch (e) {
            console.log("Error while updating async storage ", e);
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        body: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
        },

    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.body, { width: '100%' }]}>
                <ScrollView>
                    <GNTextInput
                        placeholder={t('search')}
                        iconName="search-outline"
                        iconNameFocused="search-sharp"
                        onChangeText={handleResearch}
                        width={'100%'}
                        animation={true}
                    />
                    <ContactList
                        usernames={listUsers}
                        size={50}
                        backgroundColor={COLORS.fourthText}
                        divider={false}
                        contactOnPress={async (username) => {
                            handleHistory(username);
                            const user = await FirebaseUtils.getUserByUsername(username);
                            navigation.navigate("ProfileSearch", { user: user[0] });
                        }}
                        clickOpenProfile={false}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
