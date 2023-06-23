import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import GNProfileImage from '../GN/GNProfileImage';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import FirebaseUtils from '../Models/FirebaseUtils';
import PostUtils from '../Models/PostUtils';
import GNBottomSheetModal from '../GN/GNBottomSheetModal';
import Divider from '../GN/Divider';

export default function Comment( { comment } ){

    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const fetchedProfilePic = await FirebaseUtils.getProfilePicFromUsername(comment.owner);
                setProfilePic(fetchedProfilePic);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfilePic();
    }, []);

    const bottomSheetOptionModalRef = useRef(null);

    const handlePresentOptionModal = () =>{
        bottomSheetOptionModalRef.current?.present();
    }
    
    // const styles = StyleSheet.create({
    //     itemContainer: {
    //         flexDirection: 'row',
    //         padding: 6,
    //         margin: 6,
    //         backgroundColor: "#eee",
    //         width: '100%',
    //     },
    //     username: {
    //         fontWeight: 'bold',
    //         marginHorizontal: 5,
    //     },
    //     text: {

    //     },
    //     border: {
    //         borderWidth: 1,
    //     }
    // });

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: 0,
            margin: 3,
            //backgroundColor: "#eee",
            width: '100%',
        },
        body: {
            flex: 1,
            flexDirection: 'row',
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        username: {
            fontWeight: 'bold',
        },
        timestamp: {

        },
        border: {
            // borderColor: 'black',
            //borderWidth: 1,
        },
        bottomSheetSubtitle: {
            fontWeight: "bold",
            color: COLORS.firtText,
            fontSize: 14,
        },
        bottomSheetRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-start',
            marginVertical: 5,
        }
    });

    return (
        // <View style={[styles.itemContainer, styles.border]}>
        //     <View style={{ padding: 0 }}>
        //         <GNProfileImage selectedImage={profilePic} size={35} />
        //     </View>
        //     <Text style={[styles.username, styles.border]}>{comment.owner}</Text>
        //     <Text style={[styles.text, styles.border]}>{comment.text}</Text>
        // </View>
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={[styles.border, { padding: 10 }]}>
                    <GNProfileImage selectedImage={profilePic} size={35} />
                </View>
                <View style={[styles.border, { flex: 1, padding: 10 }]}>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.border, styles.username]} numberOfLines={1} ellipsizeMode="tail">{comment.owner}</Text>
                        <Text style={[styles.border, styles.timestamp]}> ⋅ {PostUtils.formatDate(comment.timestamp)}</Text>
                    </View>
                    <Text style={styles.border} >{comment.text}</Text>
                </View>
            </View>
            <GNBottomSheetModal modalRef={bottomSheetOptionModalRef} >
                <TouchableWithoutFeedback onPress={() => {console.log("SIUMRIMUOVI")}} >
                    <View style={[styles.bottomSheetRow]}>
                        <Ionicons name="person-remove-outline" size={30} color={COLORS.firtText} />
                        <Text style={styles.bottomSheetSubtitle}>    Stop following</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Divider color={COLORS.thirdText}/>
                <TouchableWithoutFeedback onPress={() => {console.log("SIUMBLOKA")}} >
                    <View style={[styles.bottomSheetRow]}>
                        <Ionicons name="alert-circle-outline" size={30} color={'red'} />
                        <Text style={[styles.bottomSheetSubtitle, {color: 'red'}]}>    Report post</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Divider color={COLORS.thirdText}/>
            </GNBottomSheetModal>
        </View>
    );
}