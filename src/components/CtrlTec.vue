<template>
  <div style="width: 100vw; height: 100vh">
    <v-data-table
      :headers="headers"
      :items="ambientes"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="Contrato"
      show-expand
      class="elevation-1"
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <tr>
          <td class="text-start">{{ item.idLoja }}</td>
          <td class="text-start">{{ item.idCliente }}</td>
          <td class="text-start">{{ item.Nome }}</td>
          <td class="text-start">{{ item.Ambiente }}</td>
          <td class="text-start">{{ item.Contrato }}</td>
          <td class="text-start">{{ item.DataVenda }}</td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataMedicao">
              {{ item.DataMedicao }}
            </v-badge>
          </td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataTecnico">
              {{ item.DataTecnico }}
            </v-badge>
          </td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataReuniao">
              {{ item.DataReuniao }}
            </v-badge>
          </td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataAssinatura">
              {{ item.DataAssinatura }}
            </v-badge>
          </td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataIniExecProjeto">
              {{ item.DataIniExecProjeto }}
            </v-badge>
          </td>
          <td class="text-start">
            <v-badge color="red" :content="item.ATDataConclusaoProjeto">
              {{ item.DataConclusaoProjeto }}
            </v-badge>
          </td>
          <td class="text-start red--text text--lighten-1">
            {{ item.Atraso }}
          </td>
          <td>
            <v-btn @click="expand(!isExpanded)" icon color="gray"
              ><v-icon class="">{{
                isExpanded ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon></v-btn
            >
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Controle Técnico</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-switch
            v-model="singleExpand"
            label="Expandir Único"
            class="mt-2"
          ></v-switch>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline"></span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row> </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="px-0">
          <template>
            <v-stepper v-model="e6" vertical style="background-color: #f0f0f0;">
              <v-stepper-step :complete="e6 > 1" step="1" editable>
                Medição
                <small>Data e Funcionario</small>
              </v-stepper-step>
              <v-stepper-content step="1">
                <v-card color="white" class="mb-12" height="35rem">
                  <template class="d-flex flex-column">
                    <v-col cols="4" class="float-left pt-3 pr-10">
                      <v-spacer></v-spacer>
                      <h2 class="mb-3">Medição</h2>
                      <v-spacer></v-spacer>

                      <v-col cols="12" sm="12" md="12">
                        <v-label>Medidor</v-label>
                        <v-autocomplete :items="names"></v-autocomplete>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-label>Data de Medição</v-label>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Selecione uma data"
                              prepend-icon="mdi-calendar"
                              hint="DD/MM/YYYY format"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            locale="pt-BR"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-btn
                          color="primary"
                          @click="e6 = 2"
                          disabled
                          style="width:100%"
                        >
                          Agendar
                        </v-btn>

                        <v-btn
                          color="primary"
                          @click="e6 = 2"
                          disabled
                          class="mt-6"
                          style="width:100%"
                        >
                          Concluir Medição
                        </v-btn>
                      </v-col>
                    </v-col>

                    <v-col cols="8" class="float-left ">
                      <v-sheet tile height="50" class="d-flex">
                        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <h2 full-width>Agenda Geral de Medição</h2>
                        <v-spacer></v-spacer>
                        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-sheet>
                      <v-sheet height="450">
                        <v-calendar
                          ref="calendar"
                          v-model="value"
                          locale="pt-BR"
                          :weekdays="weekday"
                          :type="type"
                          :events="events"
                          :event-overlap-mode="mode"
                          :event-overlap-threshold="30"
                          :event-color="getEventColor"
                          @change="getEvents"
                        ></v-calendar>
                      </v-sheet>
                    </v-col>
                  </template>
                </v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 2">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" editable>
                Visita Técnica
                <small>Data e Funcionario</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-card color="gray lighten-1" class="mb-12" height="100%">
                  <template class="d-flex flex-column">
                    <v-col cols="12" sm="12" md="12">
                      <v-label>Técnico</v-label>
                      <v-autocomplete :items="tecnicos"></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-label>Data de Visita</v-label>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Selecione uma data"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          locale="pt-BR"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancelar
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-btn
                        color="primary"
                        @click="e6 = 2"
                        disabled
                        style="width:100%"
                      >
                        Agendar
                      </v-btn>

                      <v-btn
                        color="primary"
                        @click="e6 = 2"
                        disabled
                        class="mt-6"
                        style="width:100%"
                      >
                        Concluir Visita
                      </v-btn>
                    </v-col>
                  </template>
                </v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 3">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3" editable>
                Reunião
                <small>Data e Envolvidos</small>
              </v-stepper-step>
              <v-stepper-content step="3">
                <v-card color="white" class="mb-12" height="35rem">
                  <template class="d-flex flex-column">
                    <v-col cols="4" class="float-left pt-3 pr-10">
                      <v-spacer></v-spacer>
                      <h2 class="mb-3">Reunião</h2>
                      <v-spacer></v-spacer>

                      <v-col cols="12" sm="12" md="12">
                        <v-label>Data de Reunião</v-label>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Selecione uma data"
                              prepend-icon="mdi-calendar"
                              hint="DD/MM/YYYY format"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            locale="pt-BR"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-btn
                          color="primary"
                          @click="e6 = 2"
                          disabled
                          style="width:100%"
                        >
                          Agendar
                        </v-btn>

                        <v-btn
                          color="primary"
                          @click="e6 = 2"
                          disabled
                          class="mt-6"
                          style="width:100%"
                        >
                          Concluir Reunião
                        </v-btn>
                      </v-col>
                    </v-col>

                    <v-col cols="8" class="float-left ">
                      <v-sheet tile height="50" class="d-flex">
                        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <h2 full-width>Agenda Geral de Reuniões</h2>
                        <v-spacer></v-spacer>
                        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-sheet>
                      <v-sheet height="450">
                        <v-calendar
                          ref="calendar"
                          v-model="value"
                          locale="pt-BR"
                          :weekdays="weekday"
                          :type="type"
                          :events="events"
                          :event-overlap-mode="mode"
                          :event-overlap-threshold="30"
                          :event-color="getEventColor"
                          @change="getEvents"
                        ></v-calendar>
                      </v-sheet>
                    </v-col>
                  </template>
                </v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 4">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 4" step="4" editable>
                Assinatura
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
                ></v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 5">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 5" step="5" editable>
                Execução do Projeto
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
                ></v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 6">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 6" step="6" editable>
                Conclusão
              </v-stepper-step>
              <v-stepper-content step="6">
                <v-card
                  color="grey lighten-1"
                  class="mb-12"
                  height="200px"
                ></v-card>
                <v-btn x-medium fab primary color="primary" @click="e6 = 7">
                  <v-icon class>mdi-chevron-down</v-icon>
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </template>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      e6: 7,
      headers: [
        { text: "Loja", value: "idLoja" },
        { text: "Cód. Cli", value: "idCliente" },
        { text: "Nome", value: "Nome" },
        { text: "Ambiente", value: "Ambiente" },
        { text: "Contr.", value: "Contrato" },
        { text: "Dt. Venda", value: "DataVenda" },
        { text: "Dt. Med.", value: "DataMedicao" },
        { text: "Dt.Técnico.", value: "DataTecnico" },
        { text: "Dt. Reunião.", value: "DataReuniao" },
        { text: "Dt. Ass.", value: "DataAssinatura" },
        { text: "Dt. Ini. Exec. Proj.", value: "DataIniExecProjeto" },
        { text: "Dt. Conclusão", value: "DataConclusaoProjeto" },
        { text: "Atraso", value: "Atraso" },
        { text: "", value: "data-table-expand" },
      ],
      ambientes: [
        {
          idLoja: "2009",
          idCliente: "2825",
          Nome: "Amanda Miranda",
          Ambiente: "Cozinha",
          Contrato: "200901996",
          DataVenda: "03/09/2020",
          DataMedicao: "05/09/2020",
          ATDataMedicao: "3",
          DataTecnico: "08/09/2020",
          ATDataTecnico: "3",
          Tecnico: "Bruno Cunha",
          DataReuniao: "11/09/2020",
          ATDataReuniao: "3",
          DataAssinatura: "14/09/2020",
          ATDataAssinatura: "3",
          DataIniExecProjeto: "17/09/2020",
          ATDataIniExecProjeto: "3",
          DataConclusaoProjeto: "21/09/2020",
          ATDataConclusaoProjeto: "4",
          Atraso: "19",
        },
      ],
      type: "month",
      mode: "stack",
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "João da Silva",
        "Pedro Lopes",
        "Marcio Viana",
        "Carlos Henrique",
        "Bruno Mendonça",
        "Jaqueline Soarez",
        "José Carlos",
        "Lucas Santos",
      ],
      tecnicos: [
        "João da Silva (20)",
        "Pedro Lopes (13)",
        "Marcio Viana (7)",
        "Carlos Henrique (11)",
        "Bruno Mendonça (9)",
        "Jaqueline Soarez (23)",
        "José Carlos (15)",
        "Lucas Santos (5)",
      ],
      editedIndex: -1,
      editedItem: {
        Nome: "",
        Abreviacao: "",
      },
      defaultItem: {
        name: "",
        Abreviacao: "",
      },
    };
  },
  watch: {
    options: {
      handler() {
        this.lendoDadosApi();
      },
    },
    deep: true,
  },
  methods: {
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T09:00:00`);
      const max = new Date(`${end.date}T17:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    lendoDadosApi() {},

    editItem(item) {
      this.editedIndex = this.estados.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.estados.indexOf(item);
      confirm("Tem certeza que deseja Excluir " + item.Nome + "?") &&
        this.estados.splice(index, 1);
      console.log(item.id);
      this.loading = true;
      axios.delete(baseUrl + "Estado/" + item.id).catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let th = this;
      let index = this.editedIndex;
      if (this.editedIndex > -1) {
        axios
          .put(baseUrl + "Estado/" + this.editedItem.id, {
            Nome: this.editedItem.Nome,
            Abreviacao: this.editedItem.Abreviacao,
          })
          .then(function(response) {
            Object.assign(th.estados[index], response.data.updatedAffectLines);
          })
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
            }
          });
      } else {
        axios
          .post(baseUrl + "Estado", {
            Nome: this.editedItem.Nome,
            Abreviacao: this.editedItem.Abreviacao,
          })
          .then(function(response) {
            th.estados.push(response.data);
          })
          .catch((error) => {
            if (!error.response) {
              // network error
              this.errorStatus = "Error: Network Error";
            } else {
              this.errorStatus = error.response.data.message;
            }
          });
      }
      this.close();
    },
  },
  async mounted() {
    this.lendoDadosApi();
  },
};
</script>
