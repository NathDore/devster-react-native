import firestore from "@react-native-firebase/firestore";

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