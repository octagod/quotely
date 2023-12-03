function findOccurance(pixels, query) {
    // this function accepts an array of object and returns a new object containing 
    // 1. with the multiple query as the key and the occurance as the value
    // 2. an array of all the keys (date, country, etc)
    // 3. An array of all the values (occurance)
    let pixelsArrObjs = []
    for (let x = 0; x < pixels.length; x++) {
        let counter = 0; let obj = {};
        for (let j = 0; j < pixels.length; j++) {
            if (pixels[x][query] === pixels[j][query]) {
                if (arrayContainsKey(pixelsArrObjs, pixels[x][query]))
                    continue
                else
                    counter++
                obj[(pixels[x][query]).toString()] = counter
            }
        }
        if (Object.keys(obj).length > 0)
            pixelsArrObjs.push(obj)
        obj = {}
    }
    // get all the keys and values
    const occurances = getAllValuesFromArray(pixelsArrObjs)
    const queries = getAllKeysFromArray(pixelsArrObjs)


    return { obj: pixelsArrObjs, keys: queries, values: occurances }
}


function arrayContainsKey(arr, keyToCheck) {
    for (const obj of arr) {
        if (obj.hasOwnProperty(keyToCheck)) {
            return true;
        }
    }
    return false;
}

function getAllKeysFromArray(arr) {
    const allKeys = [];

    arr.forEach((obj) => {
        const keys = Object.keys(obj);
        allKeys.push(...keys);
    });

    allKeys.forEach((val, index) => {
        allKeys[index] = (val.toString().substring(0, 6)).replaceAll("-", " ")
    })

    return allKeys;
}


function getAllValuesFromArray(arr) {
    const allValues = [];

    arr.forEach((obj) => {
        const values = Object.values(obj);
        allValues.push(...values);
    });

    return allValues;
}


function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    let color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    if (color !== '#ffffff' || color !== '#000000')
        return color
    else
        getRandomColor()

}

const algorithms = { findOccurance, getRandomColor }

export default algorithms