import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, TextInput, Button, View, StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetFooter, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { COLORS } from '../Models/Globals';
import Divider from '../GN/Divider';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostUtils from '../Models/PostUtils';
import Comment from './Comment';
import GNButton from '../GN/GNButton'

export default function CommentSection({ postId, modalRef, height = '25%', children, title = 'Options' }) {

  const snapPoints = [height];

  const [sent, setSent] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const isTextInputValid = comment.trim().length === 0;

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

  const handleChangeText = (text) => {
    setComment(text);
  }

  const handleAddComment = () => {
    if (comment == "" || comment == null) {
      return
    }
    PostUtils.insertComment(postId, comment.trim());
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
      height: 65,
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
      borderRadius: 15,
      padding: 8,
      height: '100%',
    },
    contentContainer: {
      backgroundColor: "white",
      alignItems: 'center',
    },
  });

  let renderComments = <Text>No one commented yet, be the firt one!</Text>;

  if (comments && comments.length > 0) {
    renderComments = comments.map((com) => (
      <Comment
        comment={com}
        key={com.id}
      />
    ));

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
          <>{renderComments}</>
        </BottomSheetScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={handleChangeText}
          />
          <GNButton title={'SEND'} backgroundColor={isTextInputValid ? COLORS.thirdText : COLORS.elements} isDisabled={isTextInputValid} width={'20%'} height={'100%'} onPress={handleAddComment} />
        </View>
      </View>
    </BottomSheetModal>
  );
}

