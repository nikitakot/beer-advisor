module.exports = arr => arr.reduce((accumulator, currentValue) => {
        const temp = accumulator;
        temp[currentValue] = true;
        return temp;
    }, {}
);
