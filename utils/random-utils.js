function getRandomString(a = 8) {
    const b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let c = '';
    for (let i = 0; i < a; i++) {
        c += b.charAt(Math.floor(Math.random() * b.length));
    }
    return c;
}

function getRandomInt(a, b) {
    a = Math.ceil(a);
    b = Math.floor(b);
    return Math.floor(Math.random() * (b - a)) + a;
}

module.exports = {getRandomString, getRandomInt};
