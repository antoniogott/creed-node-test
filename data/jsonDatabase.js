const { searchPodcastsByProperties } = require('../domain/podcast');
const { getGenreById } = require('../domain/genre');

// Concrete implementation of podcast search by properties
const searchPodcastsByPropertiesImpl = (json, pageSize) => searchPodcastsByProperties((properties, page) => {
    const data = JSON.parse(json);

    const podcasts = data.podcasts.filter(p => {
        for (const key in properties) {
            if (Object.hasOwnProperty.call(properties, key)) {
                const value = properties[key];

                // Checks property for equality or inclusion
                if (p[key] instanceof Array) {
                    if (!p[key].includes(value))
                        return false;
                }
                else if (p[key] !== value) {
                    return false;
                }
            }
        }
        return true;
    });

    // Calculates results to be included in requested page
    // and whether there are more
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
        "podcasts": podcasts.slice(startIndex, endIndex),
        "total": podcasts.length,
        "hasNext": podcasts.length > endIndex
    };
});

// Concrete implementation of genre retrieval by id
const getGenreByIdImpl = (json) => getGenreById((genreId) => {
    const data = JSON.parse(json);

    const genre = data.genres.find(g => g.id === genreId);

    return genre;
});

module.exports = {
    searchPodcastsByProperties: searchPodcastsByPropertiesImpl,
    getGenreById: getGenreByIdImpl
};