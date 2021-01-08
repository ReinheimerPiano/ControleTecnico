import Repository from "./repository"
import json from "../store/dataGrid.json";
import jsonDetalhe from "../store/dataGridExpanded.json";
import ControleTecnicoModel from "../model/ControleTecnicoModel";

const mock = true;

const resource = "comercial/controle_tecnico.aspx"
export default {
    makePost(resource, formdata, isDummy, modo) {
        return new Promise((resolve, reject) => {
            if (isDummy) {
                if (modo == 0) {
                    const ret = json.map(i => new ControleTecnicoModel(i))
                    resolve(ret);
                } else if (modo == 1) {
                    const ret = jsonDetalhe.map(i => new ControleTecnicoModel(i))
                    resolve(ret);
                }
            } else {
                Repository.post(`${resource}`, formdata).then((rp) => {
                    const ret = rp.data.map(i => new ControleTecnicoModel(i))
                    resolve(ret)
                }).catch(_ => reject('makePost > Repository.post > catch'));
            }
        })
    },

    getAgendamento(modo, payload) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append("acao", "carregaGrid");
            formData.append("modo", modo);
            formData.append("jsonData", JSON.stringify(payload));
            this.makePost(`${resource}`, formData, mock, modo).then((rt) => {
                resolve(rt)
            }).catch(_ => reject(' getAgendamento > makePost > catch'));
        });
    },
    setAgendamento(payload, mode) {
        return Repository.post(`{$resource}`, {
            params: {
                acao: 'salvar',
                jsonData: JSON.stringify(payload),
                Modo: mode
            }
        });
    },
    getVinculo() {
        return Repository.post(`{$resource}`);
    },
    setVinculo(payload) {
        return Repository.post(`{$resource}`, {
            params: {
                acao: 'salvarVinculo',
                jsonData: JSON.stringify(payload)
            }
        });
    },
    getCombo(payload) {
        return Repository.post(`{$resource}`, {
            params: {
                acao: 'carregaCombo',
                jsonData: JSON.stringify(payload)
            }
        });
    }
}