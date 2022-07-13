const { getBestPodcastsByGenreHandler } = require(`./service/getBestPodcastsByGenre`);

// Function to create an application instance using the passed implementations
const createApp = ({ searchPodcastsByProperties, getGenreById }) => ({
    //Creates the concrete function by instancing the handler with the implementations received
    getBestPodcastsByGenre: getBestPodcastsByGenreHandler({ searchPodcastsByProperties, getGenreById })
});

module.exports = { createApp };
