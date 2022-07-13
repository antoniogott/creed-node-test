const express = require('express');

// Function to create the V1 router using the passed application instance
const v1Router = (app) => {
    const router = express.Router();

    // Route to search the best podcasts (paginated) with optional filters by genre, region and explicit content (safe mode)
    router.get('/best_podcasts', async function (req, res, next) {
        const genreId = parseInt(req.query.genre_id);
        const page = parseInt(req.query.page);
        const region = req.query.region;
        const safeMode = req.query.safe_mode;

        const response = await app.getBestPodcastsByGenre(genreId, region, safeMode, page);

        res.send(response);
    });

    return router;
};

module.exports = v1Router;
