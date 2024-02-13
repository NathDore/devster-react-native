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