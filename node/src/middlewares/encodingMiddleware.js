function fixEncoding(value) {
    if (typeof value === "string") {
        return value
            .replace(/Ã£/g, "ã")
            .replace(/Ã©/g, "é")
            .replace(/Ã­/g, "í")
            .replace(/Ã³/g, "ó")
            .replace(/Ãº/g, "ú")
            .replace(/Ã§/g, "ç")
            .replace(/ÃƒÂ£/g, "ã")
            .replace(/ÃƒÂ©/g, "é");
    }

    if (Array.isArray(value)) {
        return value.map(fixEncoding);
    }

    if (value !== null && typeof value === "object") {
        const obj = {};
        for (const key in value) {
            obj[key] = fixEncoding(value[key]);
        }
        return obj;
    }

    return value;
}

function encodingMiddleware(req, res, next) {
    const oldJson = res.json;

    res.json = function (data) {
        const fixed = fixEncoding(data);
        return oldJson.call(this, fixed);
    };

    next();
}

module.exports = encodingMiddleware;