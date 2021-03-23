const getFileType = (file) => {
    return file.type.split('/')[0];
};

export default getFileType;