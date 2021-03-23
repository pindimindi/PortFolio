const updateSubcategoriesCount = (count, collectionToUpdate, documentName) => {
    return collectionToUpdate.findOneAndUpdate(
        { name: documentName },
        { subcategories: count },
        { new: true }
    );
};

module.exports = updateSubcategoriesCount;