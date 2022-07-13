const countries = require('../countries.json');

// Function with the logic to setup the property filter as requested,
// collect podcast and genre data and structure the response as expected
const getBestPodcastsByGenreHandler = ({ searchPodcastsByProperties, getGenreById }) => async (genreId, region, safeMode, page) => {
    const filter = {};
    if (genreId) filter["genre_ids"] = genreId;
    if (region) filter["country"] = countries.find(c => c.code === region.toUpperCase()).name; // Translates country code to name
    if (safeMode === true) filter["explicit_content"] = false; // Translates safe mode into explicit content filter

    const searchResults = await searchPodcastsByProperties(filter, page);

    const genre = await getGenreById(genreId);

    return {
        ...genre,
        "podcasts": searchResults.podcasts,
        "total": searchResults.total,
        "has_next": searchResults.hasNext,
        "has_previous": page > 1,
        "page_number": page,
        "previous_page_number": page - 1,
        "next_page_number": page + 1
    };
};

module.exports = { getBestPodcastsByGenreHandler };