import { StyleSheet, ScrollView, View, Text } from 'react-native';
import GNProfileImage from './GNProfileImage';
import { appUser } from '../Models/Globals';
import { COLORS } from '../Models/Globals';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native-elements';
import * as VideoPicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Post({caption = "", locationInfo = "", timestamp = "ora", mediaUri = null, mediaType = null}){

    const EmptyText = ({ style,icon = "",text }) => {
        if (!text) {
          return <Text style={{ display: 'none' }}>{text}</Text>;
        }
      
        return <Text style={style}><Ionicons name={icon} size={15} />{text}</Text>;
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: COLORS.background,
        //   borderColor: 'red',
        //   borderWidth: 1,
        },
        body: {
          flex: 1,
          flexDirection: 'row',
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        mediaContainer: {
            marginVertical: 10,
            borderRadius: 15,
        },  
        username: {
            fontWeight: 'bold',
        },
        timestamp: {

        },
        location: {
            paddingVertical: 5,
        },  
        media: {
            // height: '100%',
            // aspectRatio: 3/4,
            aspectRatio: 1,
            borderRadius: 15,
            borderColor: COLORS.thirdText,
            borderWidth: 1,
        },
        border: {
            // borderColor: 'black',
            // borderWidth: 1,
        }
      });

    return (
        <View style={styles.container}>
            <View style={styles.body}> 
                <View style={[styles.border, { padding: 10}]}>
                    <GNProfileImage selectedImage={appUser.profilePic} size={50} /> 
                </View>
                <View style={[styles.border, { flex: 1, padding: 10}]}>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.border, styles.username]} numberOfLines={1} ellipsizeMode="tail">{appUser.username}</Text>
                        <Text style={[styles.border, styles.timestamp]}> ⋅ {timestamp}</Text>
                    </View>
                    <EmptyText style={styles.border} text={caption} />
                    <View style={styles.mediaContainer}>
                        <EmptyText style={[styles.border, styles.location]} icon={"location-sharp"} text={locationInfo} />  
                            {mediaUri && mediaType === 'image' && (
                                <Image 
                                    source={{ uri: mediaUri }} 
                                    style={styles.media} 
                                    // resizeMode="cover"
                                    resizeMode="cover"
                                />
                            )}
                            {mediaUri && mediaType === 'video' && (
                                <Video
                                    source={{ uri: mediaUri }}
                                    style={styles.media}
                                    useNativeControls
                                    resizeMode="contain" />
                            )}
                    </View>
                </View>
            </View>
        </View>
    );
}