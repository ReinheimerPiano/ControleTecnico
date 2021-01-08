import controleTecnicoRepository from "./controleTecnicoRepository";

const repositories = {
    'controleTecnico': controleTecnicoRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};