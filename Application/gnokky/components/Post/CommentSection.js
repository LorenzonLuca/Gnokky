import React, { useCallback, useMemo, memo, useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, TextInput, Button, View, StyleSheet, Animated, FlatList, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetFooter, BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { COLORS } from '../Models/Globals';
import Divider from '../GN/Divider';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostUtils from '../Models/PostUtils';
import Comment from './Comment';
import GNButton from '../GN/GNButton'
import { useTranslation } from 'react-i18next';
import NotificationUtils from '../Models/NotificationUtils';

function CommentSection({ postId, modalRef, height = '25%', children, title = 'Options', postOwner, updateCommentsCount }) {
    const { t } = useTranslation();
    const snapPoints = [height];

    console.log("comment section has been loaded")

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
        NotificationUtils.insertNotificationPost(postId, "comment", postOwner);
        setComment("");
        setSent(!sent);
        updateCommentsCount()
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

    // let renderComments = <Text>{t('noone-commented')}</Text>;

    // if (comments && comments.length > 0) {
    //     renderComments = comments.map((com) => (
    //         <Comment
    //             comment={com}
    //             key={com.id}
    //         />
    //     ));

    // }

    const renderComments = useMemo(() => {
        if (comments && comments.length > 0) {
            return comments.map((com) => <Comment comment={com} key={com.id} />);
        } else {
            return <Text>{t('noone-commented')}</Text>;
        }
    }, [comments]);
      

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
                        placeholder={t('add-comment')}
                        value={comment}
                        onChangeText={handleChangeText}
                    />
                    <GNButton title={t('send')} backgroundColor={isTextInputValid ? COLORS.thirdText : COLORS.elements} isDisabled={isTextInputValid} width={'20%'} height={'100%'} onPress={handleAddComment} />
                </View>
            </View>
        </BottomSheetModal>
    );
}

export default memo(CommentSection);