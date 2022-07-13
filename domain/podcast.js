// Function to search podcasts, with inversion of control to be assigned a concrete implementation
const searchPodcastsByProperties = (searchPodcastsByPropertiesImpl =
    async () => {
        throw new Error('Not implemented');
    }) =>
    async (properties, page) => {
        try {
            const podcasts = await searchPodcastsByPropertiesImpl(properties, page); // Calls passed implementation
            return podcasts;
        } catch (err) {
            throw new Error(`Unable to retrieve podcasts: ${err}`);
        }
    };

module.exports = { searchPodcastsByProperties: searchPodcastsByProperties }
