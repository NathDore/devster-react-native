import firestore from "@react-native-firebase/firestore";

//This Functions are not listening in real-time !

// Get every posts from firestore
export const getPosts = () => {
    firestore()
        .collection("posts")
        .get()
        .then((docs) => {
            const postData = docs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return postData;
        })
        .catch(error => {
            console.error('Error getting publications:', error);
        });
}

// Get every posts of the current user
export const getUserPosts = (uid) => {
    firestore()
        .collection("posts")
        .where('userId', '==', uid)
        .get()
        .then((docs) => {
            const postData = docs.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return postData;
        })
        .catch(error => {
            console.error('Error getting publications:', error);
        });
}

export const getPostComments = (postId) => {
    firestore()
        .collection('comments')
        .where('postId', '==', postId)
        .get()
        .then((querySnapshot) => {
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return commentsData;
        })
}