import util from "../utils/util";

export default class ControleTecnicoModel {
    constructor(json) {
        this.fromJson(json);
    }

    fromJson = (json) => {
        this.PRO_Emp = json['PRO_Emp'];
        this.PRO_Loja = json['PRO_Loja'];
        this.PRO_Cliente = json['PRO_Cliente'];
        this.CLI_Nome = json['CLI_Nome'];
        this.Ambientes = json['Ambientes'];
        this.PRO_Contrato = json['PRO_Contrato'];
        this.VME_DataVenda = util.intlDateFormat(json['VME_DataVenda'], 'short', 'short');
        this.CTAG_DataAgendamento_0 = util.intlDateFormat(json['CTAG_DataAgendamento_0'], 'short', 'short');
        this.CTAG_DataConclusao_0 = util.intlDateFormat(json['CTAG_DataConclusao_0'], 'short', 'short');
        this.Atraso_0 = json['Atraso_0'];
        this.CTAG_DataAgendamento_1 = util.intlDateFormat(json['CTAG_DataAgendamento_1'], 'short', 'short');
        this.CTAG_DataConclusao_1 = util.intlDateFormat(json['CTAG_DataConclusao_1'], 'short', 'short');
        this.Atraso_1 = json['Atraso_1'];
        this.CTAG_DataAgendamento_2 = util.intlDateFormat(json['CTAG_DataAgendamento_2'], 'short', 'short');
        this.CTAG_DataConclusao_2 = util.intlDateFormat(json['CTAG_DataConclusao_2'], 'short', 'short');
        this.Atraso_2 = json['Atraso_2'];
        this.CTAG_DataAgendamento_3 = util.intlDateFormat(json['CTAG_DataAgendamento_3'], 'short', 'short');
        this.CTAG_DataConclusao_3 = util.intlDateFormat(json['CTAG_DataConclusao_3'], 'short', 'short');
        this.Atraso_3 = json['Atraso_3'];
        this.CTAG_DataAgendamento_4 = util.intlDateFormat(json['CTAG_DataAgendamento_4'], 'short', 'short');
        this.CTAG_DataConclusao_4 = util.intlDateFormat(json['CTAG_DataConclusao_4'], 'short', 'short');
        this.Atraso_4 = json['Atraso_4'];
        this.TotalAtraso = json['TotalAtraso'];
    }

    toJson = () => {
        data['PRO_Emp'] = this.PRO_Emp;
        data['PRO_Loja'] = this.PRO_Loja;
        data['PRO_Cliente'] = this.PRO_Cliente;
        data['CLI_Nome'] = this.CLI_Nome;
        data['Ambientes'] = this.Ambientes;
        data['PRO_Contrato'] = this.PRO_Contrato;
        data['VME_DataVenda'] = this.VME_DataVenda;
        data['CTAG_DataAgendamento_0'] = util.dateToIsoFormat(this.CTAG_DataAgendamento_0, false);
        data['CTAG_DataConclusao_0'] = util.dateToIsoFormat(this.CTAG_DataConclusao_0, false);
        data['Atraso_0'] = this.Atraso_0;
        data['CTAG_DataAgendamento_1'] = util.dateToIsoFormat(this.CTAG_DataAgendamento_1, false);
        data['CTAG_DataConclusao_1'] = util.dateToIsoFormat(this.CTAG_DataConclusao_1, false);
        data['Atraso_1'] = this.Atraso_1;
        data['CTAG_DataAgendamento_2'] = util.dateToIsoFormat(this.CTAG_DataAgendamento_2, false);
        data['CTAG_DataConclusao_2'] = util.dateToIsoFormat(this.CTAG_DataConclusao_2, false);
        data['Atraso_2'] = this.Atraso_2;
        data['CTAG_DataAgendamento_3'] = util.dateToIsoFormat(this.CTAG_DataAgendamento_3, false);
        data['CTAG_DataConclusao_3'] = util.dateToIsoFormat(this.CTAG_DataConclusao_3, false);
        data['Atraso_3'] = this.Atraso_3;
        data['CTAG_DataAgendamento_4'] = util.dateToIsoFormat(this.CTAG_DataAgendamento_4, false);
        data['CTAG_DataConclusao_4'] = util.dateToIsoFormat(this.CTAG_DataConclusao_4, false);
        data['Atraso_4'] = this.Atraso_4;
        data['TotalAtraso'] = this.TotalAtraso;
        return data;
    }
}