const updateNumberOfUsers = (count, collectionToUpdate, documentName) => {
    return collectionToUpdate.findOneAndUpdate(
        { name: documentName },
        { users: count },
        { new: true }
    );
};

module.exports = updateNumberOfUsers;