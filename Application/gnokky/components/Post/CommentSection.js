import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, TextInput, Button, View, StyleSheet, Animated,FlatList , ScrollView } from 'react-native';
import BottomSheet, { BottomSheetFooter, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { COLORS } from '../Models/Globals';
import Divider from '../GN/Divider';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostUtils from '../Models/PostUtils';
import Comment from './Comment';

export default function CommentSection({postId, modalRef, height = '25%', children, title = 'Options' }) {
  
  const snapPoints = [height];

  const [sent, setSent] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
//const [comments, setComments] = useState([{text: "sium"},{text: "asldkjaséflkasfd"}]);


  useEffect(() => {
    const fetchCommentsFromFirestore = async () => {
      const fetchedComments = await PostUtils.fetchComments(postId);
      setComments(fetchedComments);
    };

    fetchCommentsFromFirestore();
  }, [sent]);

  const handleDismissModal = () => {
    modalRef.current?.dismiss();
  };

  const handleAddComment = () => {
    if(comment == "" && comment == null){
      return
    }
    PostUtils.insertComment(postId, comment);
    setComment("");
    setSent(!sent);
  }

  const styles = StyleSheet.create({
    commentSectionContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    commentListContainer: {
      flexGrow: 1,
      borderWidth: 1,
    },
    commentItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#CCCCCC',
      paddingVertical: 8,
    },
    commentInput: {
      flex: 1,
      marginRight: 8,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 4,
      padding: 8,
    },
    contentContainer: {
      backgroundColor: "white",
      alignItems: 'center',
    },
  });

  if (comments && comments.length > 0) {
    const renderComments = comments.map((com) => (
      // <View key={comment.id} style={styles.itemContainer}>
      //   <View style={{ padding: 10 }}>
      //     {/* <GNProfileImage selectedImage={''} size={50} /> */}
      //   </View>
      //   <Text>{comment.text}</Text>
      // </View>
      <>
      <Comment 
        comment={com} 
        key={com.id}
      />
      </>
    ));

    return (
      <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 30, backgroundColor: COLORS.fourthText }}
        backdropComponent={({ style }) => (
          <TouchableWithoutFeedback onPress={handleDismissModal}>
            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
          </TouchableWithoutFeedback>
        )}
        keyboardBehavior="fillParent"
      >
        <View style={styles.commentSectionContainer}>
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <>{renderComments}</>
          </BottomSheetScrollView>
  
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <Button title="Send" onPress={handleAddComment} />
          </View>
        </View>
      </BottomSheetModal>
    );
  }

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 30, backgroundColor: COLORS.fourthText }}
      backdropComponent={({ style }) => (
        <TouchableWithoutFeedback onPress={handleDismissModal}>
          <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
        </TouchableWithoutFeedback>
      )}
      keyboardBehavior="fillParent"
    >
      <View style={styles.commentSectionContainer}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
           <Text>No comments yet, be the first one!</Text>
        </BottomSheetScrollView>
  
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
          />
          <Button title="Send" onPress={handleAddComment} />
        </View>
      </View>
    </BottomSheetModal>
  );
}

