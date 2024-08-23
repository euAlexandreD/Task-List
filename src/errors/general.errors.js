const notAllowedFieldsToUpdade = (res) => {
    return res.status(500).send("Um ou mais campos não são editaveis");
};

module.exports = {
    notAllowedFieldsToUpdade,
};
