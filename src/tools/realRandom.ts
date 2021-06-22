
//Because random was not random enough
let lastNumber :number;
function getRandNumber(x :number) :number {
    var r = Math.floor((Math.random() * x));
    if (r === lastNumber) {
        return getRandNumber(x);
    }
    return r;
}
module.exports = function (x :number) {
    const number = getRandNumber(x);
    lastNumber = number;
    return number;
};
