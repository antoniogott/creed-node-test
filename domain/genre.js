// Function to retrieve genre by ID, with inversion of control to be assigned a concrete implementation
const getGenreById = (getGenreByIdImpl =
    async () => {
        throw new Error('Not implemented');
    }) =>
    async (genreId) => {
        try {
            const podcasts = await getGenreByIdImpl(genreId); // Calls passed implementation
            return podcasts;
        } catch (err) {
            throw new Error(`Unable to retrieve genre: ${err}`);
        }
    };

module.exports = { getGenreById: getGenreById }
