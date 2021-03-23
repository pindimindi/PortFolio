// const getDataUrl = (file) => {
//     console.log('file from function', file);
//     let url;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//         url = reader.result
//     }

// };

function getDataUrl(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function () { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default getDataUrl;