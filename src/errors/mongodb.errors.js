const notFoundError = (res) => {
    return res.status(404).send("Dado não encontrado na base de dados");
};

const objectIdError = (res) => {
    return res
        .status(500)
        .send("Erro ao recuperar algum dado na nossa base de dados ");
};

module.exports = {
    notFoundError,
    objectIdError,
};
