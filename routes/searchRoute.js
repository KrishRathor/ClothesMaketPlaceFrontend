require('dotenv').config({ path: '../.env' });
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(process.env.ALGOLIA_API_KEY, process.env.ALGOLIA_SEARCH_KEY);
const index = algoliaClient.initIndex('clothesMarketPlace');

const searchRoute = async (req, res) => {
    const { searchQuery } = req.body;

    try {
        const searchResults = await index.search(searchQuery);
        res.json(searchResults);
      } catch (error) {
        console.error('Error performing search: ', error);
        res.status(500).json({ error: 'An error occurred while searching.' });
      }

}

module.exports = { searchRoute };
