import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { COLORS } from '../Models/Globals';
import { useEffect } from 'react';

export default function PostInteractions() {

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [repostsCount, setRepostsCount] = useState(0);

    useEffect(() => {
        
    }, [])

    const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 5,
          // backgroundColor: '#ebebeb',
          borderRadius: 10,
        },
        interaction: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        interactionIcon: {
            color: '#63666A',
        },
        interactionCount: {
          marginLeft: 5,
          fontSize: 16,
          color: COLORS.secondText,
        },
        border: {
          // borderColor: 'black',
          // borderWidth: 1,
        },
    });
      


  return (
    <View style={[styles.container, styles.border]}>
      <View style={styles.interaction}>
        <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? 'red' : '#63666A'}
            onPress={() => { setLiked(!liked) }}
            size={24}
        />
        <Text style={styles.interactionCount}>{likesCount}</Text>
      </View>
      <View style={styles.interaction}>
        <Ionicons
            style={styles.interactionIcon}
            name='chatbox-outline'
            onPress={() => { console.log("Commenti"); }}
            size={24}
        />
        <Text style={styles.interactionCount}>{commentsCount}</Text>
      </View>
      <View style={styles.interaction}>
        <Ionicons
            style={styles.interactionIcon}
            name='sync-outline'
            onPress={() => { console.log("Condivisioni"); }}
            size={24}
        />
        <Text style={styles.interactionCount}>{repostsCount}</Text>
      </View>
      <View style={styles.interaction}>
        <Ionicons
            style={styles.interactionIcon}
            name='paper-plane-outline'
            onPress={() => { console.log("Invia messaggio"); }}
            size={24}
        />
        {/* <Text style={styles.interactionCount}></Text> */}
      </View>
    </View>
  );
}
