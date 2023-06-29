import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { COLORS } from '../Models/Globals';
import { useEffect, useRef, useRoute  } from 'react';
import PostUtils from '../Models/PostUtils';
import CommentSection from '../Post/CommentSection';
import RepostPage from '../Repost/RepostPage';
import { Modal } from 'react-native';

export default function PostInteractions({post}) {
    const [modalVisible, setModalVisible] = useState(false);

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    
    const bottomSheetCommentsModalRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        setLiked(await PostUtils.checkIfLiked(post.id));
        setLikesCount(await PostUtils.getLikeCount(post.id));
        setCommentsCount(await PostUtils.getCommentsCount(post.id));
      }
      fetchData();
    }, [])

    const handlePresentCommentsModal = () =>{
      bottomSheetCommentsModalRef.current?.present();
    }

    const handleLikePost = async () =>{
      if(liked){
        await PostUtils.dislikePost(post.id);
      }else{
        await PostUtils.likePost(post.id);
      }
      setLiked(!liked);
      setLikesCount(await PostUtils.getLikeCount(post.id));
    }

    const handleComments = () => {
      handlePresentCommentsModal();
    }

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
        //borderWidth: 1,
      },
  });
      
  return (
    <View style={[styles.container, styles.border]}>
      <Modal visible={modalVisible} animationType="slide">
          <RepostPage post={post} onClose={() => setModalVisible(false)} />
      </Modal>
      <View style={styles.interaction}>
        <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? 'red' : '#63666A'}
            onPress={handleLikePost}
            size={24}
        />
        <Text style={styles.interactionCount}>{likesCount}</Text>
      </View>
      <View style={styles.interaction}>
        <Ionicons
            style={styles.interactionIcon}
            name='chatbox-outline'
            onPress={handleComments}
            size={24}
        />
        <Text style={styles.interactionCount}>{commentsCount}</Text>
      </View>
      <View style={styles.interaction}>
        <Ionicons
            style={styles.interactionIcon}
            name='sync-outline'
            onPress={() => setModalVisible(true)}
            size={24}
        />
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
      <CommentSection postId={post.id} modalRef={bottomSheetCommentsModalRef} title='Comments' height='90%' />
    </View>
  );
}
