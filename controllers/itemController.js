const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
    const { page = 1, limit = 10, query } = req.query;

    try {
        let searchQuery = {};
        if (query) {
            searchQuery = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { variantSKU: { $regex: query, $options: 'i' } }
                ]
            };
        }

        const items = await Item.find(searchQuery)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Item.countDocuments(searchQuery);

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            items: items,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItemBySKU = async (req, res) => {
    try {
        const { sku } = req.params;
        const item = await Item.findOne({ sku:sku });

        if(!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createItem = async (req, res) => {
    const {
        handle,
        title,
        body,
        vendor,
        type,
        tags,
        option1Name,
        option1Value,
        option2Name,
        option2Value,
        option3Name,
        option3Value,
        variantSKU,
        variantGrams,
        variantInventoryTracker,
        variantInventoryQty,
        variantInventoryPolicy,
        variantFulfillmentService,
        variantPrice,
        variantCompareAtPrice,
        imageSrc
    } = req.body;

    try {
        const item = new Item({
            handle,
            title,
            body,
            vendor,
            type,
            tags,
            option1Name,
            option1Value,
            option2Name,
            option2Value,
            option3Name,
            option3Value,
            variantSKU,
            variantGrams,
            variantInventoryTracker,
            variantInventoryQty,
            variantInventoryPolicy,
            variantFulfillmentService,
            variantPrice,
            variantCompareAtPrice,
            imageSrc
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    const { sku } = req.params;
    const updates = req.body;

    try {
        const item = await Item.findOneAndUpdate({ variantSKU: sku }, updates, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    const { sku } = req.params;

    try {
        const item = await Item.findOneAndDelete({ sku:sku });
        if(!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

exports.searchItems = async (req, res) => {
    const { query } = req.query;
    try {
        const items = await Item.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { variantSKU: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};