const Item = require('../models/Item'); // Import your Item model

exports.queryChat = async (req, res) => {
    const { query } = req.body;

    // Check if the query is empty or contains only random or irrelevant text
    if (!query || query.trim().length === 0) {
        return res.status(200).json({ message: 'Query cannot be empty.' });
    }

    try {
        // Parse the user query and extract relevant data
        const lowerQuery = query.toLowerCase();
        let searchCriteria = {};

        const allTypes = await Item.distinct('type');
        
        if (lowerQuery.includes('under')) {
            const priceMatch = lowerQuery.match(/under (\d+)/);
            if (priceMatch) {
                searchCriteria.variantPrice = { $lt: parseInt(priceMatch[1]) };
            }
        }

        // Check if the query mentions any of the dynamic types (e.g., electronics, clothes, etc.)
        const matchedType = allTypes.find(type => lowerQuery.includes(type.toLowerCase()));
        if (matchedType) {
            searchCriteria.type = matchedType;
        }

        if (Object.keys(searchCriteria).length === 0) {
            return res.status(200).json({items:[]});
        }

        const items = await Item.find(searchCriteria);

        res.status(200).json(items);
        
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ message: 'Error occurred while processing your search.' });
    }
};