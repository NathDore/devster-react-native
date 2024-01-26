import axios from 'axios';

export const getRandomUser = async () => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const randomUser = response.data.results[0];

        const resPost = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const randomPost = resPost.data[Math.floor(Math.random() * resPost.data.length)];

        return {
            username: randomUser.name.first,
            email: randomUser.email,
            profilePicture: randomUser.picture.large,
            post: randomPost.body,
        };
    } catch (err) {
        console.error('Error fetching random user:', err);
        return null;
    }
}

export const generateRandomTimestamp = () => {
    const currentTimestamp = Date.now();
    const randomTimestamp = currentTimestamp - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000);
    return randomTimestamp;
}

export const convertTimestampToRelativeTime = (timestamp) => {
    const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
    } else if (secondsAgo < 60 * 60) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (secondsAgo < 60 * 60 * 24) {
        const hoursAgo = Math.floor(secondsAgo / (60 * 60));
        return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else {
        const daysAgo = Math.floor(secondsAgo / (60 * 60 * 24));
        return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    }
};