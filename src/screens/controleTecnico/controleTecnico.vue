<template>
  <v-app id="inspire">
    <v-toolbar
      color="grey lighten-5"
      style="width: 100vw; position: fixed"
      dense
      elevation="0"
      absolute
    >
      <v-slide-x-transition mode="out-in">
        <v-col v-if="searchExpanded" cols="4" class="ml-1">
          <v-combobox
            label="Nome"
            class="mb-n7 rounded-0 rounded-l"
            style="float: left; width: 8rem; line-height: 2rem !important"
          ></v-combobox>
          <v-text-field
            append-icon="mdi-close"
            @click:append="searchExpanded = !searchExpanded"
            label="Pesquisar"
            class="mb-n7 rounded-0 rounded-r"
            style="line-height: 2rem"
          >
          </v-text-field>
        </v-col>
        <v-btn
          v-else
          icon
          @click="searchExpanded = !searchExpanded"
          class="ml-1"
        >
          <v-icon class="">mdi-magnify</v-icon>
        </v-btn>
      </v-slide-x-transition>

      <v-divider class="mx-2" vertical inset></v-divider>

      <v-slide-x-transition mode="out-in">
        <div v-if="filterExpanded" class="d-flex" cols="3">
          <v-col class="px-1">
            <v-combobox
              clearable
              dense
              :items="eventos.map((obj) => obj)"
              :item-value="(obj) => obj['Cliente'].Nome"
              :item-text="(obj) => obj['Cliente'].Nome"
              label="Clientes"
              class="mb-n7"
              color=""
            ></v-combobox>
          </v-col>
          <v-col class="px-1">
            <v-combobox
              clearable
              dense
              :items="tecnicos.map((obj) => obj)"
              :item-value="(obj) => obj['name']"
              :item-text="(obj) => obj['name']"
              label="Vendedor"
              class="mb-n7"
              color=""
            ></v-combobox>
          </v-col>
          <v-col class="px-1">
            <v-combobox
              clearable
              dense
              :items="tecnicos.map((obj) => obj)"
              :item-value="(obj) => obj['name']"
              :item-text="(obj) => obj['name']"
              label="Técnico"
              class="mb-n7"
              color=""
            ></v-combobox>
          </v-col>
          <v-btn icon @click="filterExpanded = !filterExpanded">
            <v-icon class="px-1"> mdi-close</v-icon>
          </v-btn>
        </div>
        <v-btn v-else icon @click="filterExpanded = !filterExpanded">
          <v-icon class="px-1">mdi-filter</v-icon>
        </v-btn>
      </v-slide-x-transition>

      <v-divider class="mx-2" vertical inset></v-divider>

      <v-btn icon>
        <v-icon class="px-1">mdi-printer</v-icon>
      </v-btn>

      <v-divider class="mx-2" vertical inset></v-divider>

      <v-btn icon>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-dialog v-model="helperDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mx-1">
            <v-icon class="">mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Precisa de Ajuda?
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="helperDialog = false">
              ENTENDI
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon @click.stop="drawer = !drawer" class="mx-1">
        <v-icon class="">mdi-cog-outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main>
      <v-container class="fill-height overflow-hidden pt-5" fluid style="position: relative;">
        <v-layout column style="height: 88.9vh">
          <v-flex class="mb-0" style="overflow: auto">
            <v-data-table
              :headers="headers"
              :items="eventos"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="PRO_Contrato"
              show-expand
              class="elevation-1"
              style="width: 100vw; heigth: 100%"
              @item-expanded="loadExpanded"
              :footer-props="{itemsPerPageText: 'Linhas por Página'}"
            >
              <template v-slot:item="{ item, expand, isExpanded }">
                <tr>
                  <td class="text-start">{{ item.PRO_Emp }}</td>
                  <td class="text-start">{{ item.PRO_Loja }}</td>
                  <td class="text-start">{{ item.PRO_Cliente }}</td>
                  <td class="text-start">{{ item.CLI_Nome }}</td>
                  <td class="text-start">{{ item.Ambientes }}</td>
                  <td class="text-start">{{ item.PRO_Contrato }}</td>
                  <td class="text-center">
                    {{ item.VME_DataVenda }}
                  </td>
                  <td
                    :class="
                      overdue(item.CTAG_DataAgendamento_0)
                        ? item.CTAG_DataConclusao_0 != ''
                          ? 'text-center green--text text--darken-4'
                          : 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{
                      item.CTAG_DataConclusao_0 != ""
                        ? item.CTAG_DataConclusao_0
                        : item.CTAG_DataAgendamento_0
                    }}
                    <v-badge
                      style="position: relative"
                      v-show="item.Atraso_0 > 0"
                      :color="
                        overdue(item.CTAG_DataAgendamento_0)
                          ? item.CTAG_DataConclusao_0 != ''
                            ? 'green'
                            : 'red'
                          : 'green'
                      "
                      :content="item.Atraso_0"
                      class="mb-2"
                    >
                    </v-badge>
                  </td>
                  <td
                    :class="
                      overdue(item.CTAG_DataAgendamento_1)
                        ? item.CTAG_DataConclusao_1 != ''
                          ? 'text-center green--text text--darken-4'
                          : 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{
                      item.CTAG_DataConclusao_1 != ""
                        ? item.CTAG_DataConclusao_1
                        : item.CTAG_DataAgendamento_1
                    }}
                    <v-badge
                      style="position: relative"
                      v-show="item.Atraso_1 > 0"
                      :color="
                        overdue(item.CTAG_DataAgendamento_1)
                          ? item.CTAG_DataConclusao_1 != ''
                            ? 'green'
                            : 'red'
                          : 'green'
                      "
                      :content="item.Atraso_1"
                      class="mb-2"
                    >
                    </v-badge>
                  </td>
                  <td
                    :class="
                      overdue(item.CTAG_DataAgendamento_2)
                        ? item.CTAG_DataConclusao_2 != ''
                          ? 'text-center green--text text--darken-4'
                          : 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{
                      item.CTAG_DataConclusao_2 != ""
                        ? item.CTAG_DataConclusao_2
                        : item.CTAG_DataAgendamento_2
                    }}
                    <v-badge
                      style="position: relative"
                      v-show="item.Atraso_2 > 0"
                      :color="
                        overdue(item.CTAG_DataAgendamento_2)
                          ? item.CTAG_DataConclusao_2 != ''
                            ? 'green'
                            : 'red'
                          : 'green'
                      "
                      :content="item.Atraso_2"
                      class="mb-2"
                    >
                    </v-badge>
                  </td>
                  <td
                    :class="
                      overdue(item.CTAG_DataAgendamento_3)
                        ? item.CTAG_DataConclusao_3 != ''
                          ? 'text-center green--text text--darken-4'
                          : 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{
                      item.CTAG_DataConclusao_3 != ""
                        ? item.CTAG_DataConclusao_3
                        : item.CTAG_DataAgendamento_3
                    }}
                    <v-badge
                      style="position: relative"
                      v-show="item.Atraso_3 > 0"
                      :color="
                        overdue(item.CTAG_DataAgendamento_3)
                          ? item.CTAG_DataConclusao_3 != ''
                            ? 'green'
                            : 'red'
                          : 'green'
                      "
                      :content="item.Atraso_3"
                      class="mb-2"
                    >
                    </v-badge>
                  </td>
                  <td
                    :class="
                      overdue(item.CTAG_DataAgendamento_4)
                        ? item.CTAG_DataConclusao_4 != ''
                          ? 'text-center green--text text--darken-4'
                          : 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{
                      item.CTAG_DataConclusao_4 != ""
                        ? item.CTAG_DataConclusao_4
                        : item.CTAG_DataAgendamento_4
                    }}
                    <v-badge
                      style="position: relative"
                      v-show="item.Atraso_4 > 0"
                      :color="
                        overdue(item.CTAG_DataAgendamento_4)
                          ? item.CTAG_DataConclusao_4 != ''
                            ? 'green'
                            : 'red'
                          : 'green'
                      "
                      :content="item.Atraso_4"
                      class="mb-2"
                    >
                    </v-badge>
                  </td>
                  <td class="text-center">
                    {{ item.CTAG_DataConclusao_4 }}
                  </td>
                  <td
                    :class="
                      item.Atraso > 25
                        ? 'text-center red--text text--darken-4'
                        : 'text-center'
                    "
                  >
                    {{ item.TotalAtraso }}
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

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="px-0">
                  <template>
                    <v-stepper
                      v-model="stp"
                      non-linear
                      vertical
                      style="background-color: #f0f0f0"
                    >
                      <v-stepper-step
                        :complete="item.CTAG_DataConclusao_0 != ''"
                        step="1"
                        editable
                        :edit-icon="
                          item.CTAG_DataConclusao_0 != ''
                            ? 'mdi-check'
                            : 'mdi-progress-clock'
                        "
                        :color="
                          item.CTAG_DataConclusao_0 != ''
                            ? 'success'
                            : 'primary'
                        "
                      >
                        Medição
                        <small>Data e Funcionário</small>
                      </v-stepper-step>
                      <v-stepper-content step="1">
                        <v-card color="white" class="mb-12" height="40rem">
                          <template class="d-flex flex-column">
                            <v-col cols="12" class="float-left mt-5">
                              <v-sheet tile height="60" class="d-flex">
                                <v-btn
                                  icon
                                  class="ma-2"
                                  @click="$refs.calendar.prev()"
                                >
                                  <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <h2 full-width class="mt-2">
                                  Agenda Geral de Medição
                                </h2>
                                <v-spacer></v-spacer>

                                <v-autocomplete
                                  label="Medidores"
                                  class="pr-5"
                                  solo
                                  :items="medidores.map((obj) => obj)"
                                  :item-value="(obj) => obj['name']"
                                  :item-text="(obj) => obj['name']"
                                ></v-autocomplete>

                                <v-btn
                                  color="primary"
                                  @click="consoleImprimi"
                                  x-large
                                >
                                  Agendar
                                </v-btn>
                                <v-btn
                                  icon
                                  class="ma-2"
                                  @click="$refs.calendar.next()"
                                >
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
                              <v-btn
                                color="success"
                                @click="stp = 2"
                                large
                                class="mt-6"
                                style="width: 100%"
                              >
                                Concluir Medição
                              </v-btn>
                            </v-col>
                          </template>
                        </v-card>
                        <v-btn
                          x-medium
                          fab
                          primary
                          color="primary"
                          @click="stp = 2"
                        >
                          <v-icon class>mdi-chevron-down</v-icon>
                        </v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="item.CTAG_DataConclusao_1 != ''"
                        step="2"
                        editable
                        :edit-icon="
                          item.CTAG_DataConclusao_1 != ''
                            ? 'mdi-check'
                            : 'mdi-progress-clock'
                        "
                        :color="
                          item.CTAG_DataConclusao_1 != ''
                            ? 'success'
                            : 'primary'
                        "
                      >
                        Atribuir Técnico
                      </v-stepper-step>
                      <v-stepper-content step="2">
                        <v-card
                          color="gray lighten-1"
                          class="mb-12"
                          height="100%"
                        >
                          <template class="d-flex flex-column">
                            <v-col class="py-5" cols="12" sm="12" md="12">
                              <v-autocomplete
                                label="Técnicos"
                                solo
                                :items="tecnicos.map((obj) => obj)"
                                :item-value="(obj) => obj['name']"
                                :item-text="
                                  (obj) =>
                                    obj['name'] +
                                    ' - ' +
                                    obj['ambientesExec'] +
                                    ' em Andamento'
                                "
                              ></v-autocomplete>
                              <v-btn
                                color="primary"
                                @click="stp = 3"
                                style="width: 100%"
                                large
                              >
                                ATRIBUIR TÉCNICO
                              </v-btn>

                              <v-btn
                                color="success"
                                @click="stp = 3"
                                class="mt-6"
                                style="width: 100%"
                                large
                              >
                                Concluir Etapa
                              </v-btn>
                            </v-col>
                          </template>
                        </v-card>
                        <v-btn
                          x-medium
                          fab
                          primary
                          color="primary"
                          @click="stp = 3"
                        >
                          <v-icon class>mdi-chevron-down</v-icon>
                        </v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="item.CTAG_DataConclusao_2 != ''"
                        step="3"
                        editable
                        :edit-icon="
                          item.CTAG_DataConclusao_2 != ''
                            ? 'mdi-check'
                            : 'mdi-progress-clock'
                        "
                        :color="
                          item.CTAG_DataConclusao_2 != ''
                            ? 'success'
                            : 'primary'
                        "
                      >
                        Reunião
                        <small>Data e Envolvidos</small>
                      </v-stepper-step>
                      <v-stepper-content step="3">
                        <v-card color="white" class="mb-12" height="40rem">
                          <template class="d-flex flex-column">
                            <v-col cols="12 mt-5" class="float-left">
                              <v-sheet tile height="60" class="d-flex">
                                <v-btn
                                  icon
                                  class="ma-2"
                                  @click="$refs.calendar.prev()"
                                >
                                  <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <h2 full-width>Agenda Geral de Reuniões</h2>
                                <v-spacer></v-spacer>
                                <v-autocomplete
                                  v-model="interessados"
                                  :items="funcionariosGeral"
                                  chips
                                  deletable-chips
                                  item-text="name"
                                  item-value="name"
                                  multiple
                                  solo
                                  label="Envolvidos"
                                  class="pr-5"
                                >
                                  <template v-slot:selection="data">
                                    <v-chip
                                      v-bind="data.attrs"
                                      :input-value="data.selected"
                                      close
                                      @click="data.select"
                                      @click:close="remove(data.item)"
                                    >
                                      {{ data.item.name }}
                                    </v-chip>
                                  </template>
                                  <template v-slot:item="data">
                                    <template
                                      v-if="typeof data.item !== 'object'"
                                    >
                                      <v-list-item-content
                                        v-text="data.item"
                                      ></v-list-item-content>
                                    </template>
                                    <template v-else>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          class="text-left"
                                          v-html="data.item.name"
                                        ></v-list-item-title>
                                        <v-list-item-subtitle
                                          class="text-left"
                                          v-html="data.item.group"
                                        ></v-list-item-subtitle>
                                      </v-list-item-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                                <v-btn x-large color="primary" @click="stp = 4">
                                  Agendar
                                </v-btn>

                                <v-btn
                                  icon
                                  class="ma-2"
                                  @click="$refs.calendar.next()"
                                >
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
                              <v-btn
                                color="success"
                                @click="stp = 4"
                                class="mt-6"
                                style="width: 100%"
                                large
                              >
                                Concluir Reunião
                              </v-btn>
                            </v-col>
                          </template>
                        </v-card>
                        <v-btn
                          x-medium
                          fab
                          primary
                          color="primary"
                          @click="stp = 4"
                        >
                          <v-icon class>mdi-chevron-down</v-icon>
                        </v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="item.CTAG_DataConclusao_3 != ''"
                        step="4"
                        editable
                        :edit-icon="
                          item.CTAG_DataConclusao_3 != ''
                            ? 'mdi-check'
                            : 'mdi-progress-clock'
                        "
                        :color="
                          item.CTAG_DataConclusao_3 != ''
                            ? 'success'
                            : 'primary'
                        "
                      >
                        Assinatura
                      </v-stepper-step>
                      <v-stepper-content step="4">
                        <v-card color="white" class="pa-3 mb-12" height="100%">
                          <v-row>
                            <v-col cols="4" class="float-left pt-3 pr-10">
                              <v-spacer></v-spacer>
                              <h2 class="mb-3">Assinatura</h2>
                              <v-spacer></v-spacer>
                              <v-expansion-panels popout class="mb-3">
                                <v-expansion-panel>
                                  <v-expansion-panel-header
                                    >Dados de Contato</v-expansion-panel-header
                                  >
                                  <v-expansion-panel-content>
                                    <v-form ref="form">
                                      <v-text-field
                                        label="Nome"
                                        value="Fulano de Tal"
                                        disabled
                                      ></v-text-field>
                                      <v-text-field
                                        label="E-mail"
                                        value="teste@teste.com"
                                        disabled
                                      ></v-text-field>
                                      <v-text-field
                                        label="Telefone"
                                        value="(14) 3452-6289"
                                        disabled
                                      ></v-text-field>
                                      <v-text-field
                                        label="Celular"
                                        value="(14) 99785-6289"
                                        disabled
                                      ></v-text-field>
                                    </v-form>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                              <v-label>Data da Assinatura</v-label>
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
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                  >
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

                              <v-btn
                                color="primary"
                                large
                                @click="stp = 5"
                                style="width: 100%"
                              >
                                Agendar
                              </v-btn>

                              <v-btn
                                color="success"
                                large
                                @click="stp = 5"
                                class="mt-6"
                                style="width: 100%"
                              >
                                Concluir Assinatura
                              </v-btn>
                            </v-col>
                            <v-col cols="8">
                              <v-simple-table style="height: 20rem">
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-left">Tentativa</th>
                                      <th class="text-left">Data</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <!-- <tr v-for="item in explod.cliente.contatos" :key="item.tentativa">
                              <td>{{ item.tentativa }}</td>
                              <td>{{ item.data }}</td>
                            </tr> -->
                                    <tr>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-btn
                          x-medium
                          fab
                          primary
                          color="primary"
                          @click="stp = 5"
                        >
                          <v-icon class>mdi-chevron-down</v-icon>
                        </v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="item.CTAG_DataConclusao_4 != ''"
                        step="5"
                        editable
                        :edit-icon="
                          item.CTAG_DataConclusao_4 != ''
                            ? 'mdi-check'
                            : 'mdi-progress-clock'
                        "
                        :color="
                          item.CTAG_DataConclusao_4 != ''
                            ? 'success'
                            : 'primary'
                        "
                      >
                        Projeto Técnico
                      </v-stepper-step>
                      <v-stepper-content step="5">
                        <v-card color="white" class="pa-3 mb-12" height="100%">
                          <v-btn
                            color="success"
                            large
                            @click="stp = 6"
                            class="mt-6"
                            style="width: 100%"
                          >
                            Concluir Projeto Executivo
                          </v-btn></v-card
                        >
                        <v-btn
                          x-medium
                          fab
                          primary
                          color="primary"
                          @click="stp = 6"
                        >
                          <v-icon class>mdi-chevron-down</v-icon>
                        </v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </template>
                </td>
              </template>

              <!-- <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength}">
                <p>{pageStart}/{pageStop} de {itemsLength}</p>
              </temnplate> -->
            </v-data-table>
          </v-flex>
        </v-layout>
        <v-navigation-drawer v-model="drawer" right absolute temporary >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
        </v-navigation-drawer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import util from "../../utils/util";
import { RepositoryFactory } from "../../repositories/repositoryFactory";
const ControleTecnico = RepositoryFactory.get("controleTecnico");

export default {
  data() {
    return {
      drawer: null,
      searchExpanded: false,
      filterExpanded: false,
      helperDialog: false,
      expanded: [],
      singleExpand: true,
      stp: 0,
      headers: [
        { text: "Emp", value: "PRO_Emp" },
        { text: "Loja", value: "PRO_Loja" },
        { text: "Cód. Cli", value: "Cliente[0].CLI_Codigo" },
        { text: "Nome", value: "Cliente[0].CLI_Nome" },
        { text: "Ambiente", value: "PRO_Ambiente" },
        { text: "Contr.", value: "PRO_Contrato" },
        { text: "Dt. Venda", value: "DataVenda" },
        { text: "Dt. Med.", value: "CTAG_DataAgendamento_0" },
        { text: "Dt.Técnico.", value: "CTAG_DataAgendamento_1" },
        { text: "Dt. Reunião.", value: "CTAG_DataAgendamento_2" },
        { text: "Dt. Ass.", value: "CTAG_DataAgendamento_3" },
        { text: "Dt. Proj. Tec.", value: "DataIniExecProjeto" },
        { text: "Dt. Conclusão", value: "CTAG_DataConclusao_4" },
        { text: "TOTAL ATRASO", value: "Atraso" },
        { text: "", value: "data-table-expand" },
      ],
      eventos: [],
      evento: {
        PRO_Emp: 0,
        PRO_Loja: 0,
        PRO_Opcao: "",
        PRO_Ambiente: "",
        PRO_Contrato: 0,
        Cliente: [
          {
            CLI_Codigo: 0,
            CLI_Nome: "",
            CLI_Email: "",
            CLI_CorFone1: 0,
            CLI_CorFone2: 0,
          },
        ],
        Agendamento_Medicao: [
          {
            CTAG_Evento: 0,
            CTEV_Descricao: "",
            CTAG_DataCadastro: "",
            USU_CodigoCad: 0,
            USU_NomeCad: "",
            CTAG_DataAgendamento: "",
            USU_CodigoAge: 0,
            USU_NomeAge: "",
            CTAG_DataConclusao: "",
            USU_CodigoCon: 0,
            USU_NomeCon: "",
            CTAG_DataDesativado: "",
            USU_CodigoDes: 0,
            USU_NomeDes: "",
            Atraso: 0,
          },
        ],
        Agendamento_VisitaTecnica: [
          {
            CTAG_Evento: 0,
            CTEV_Descricao: "",
            CTAG_DataCadastro: "",
            USU_CodigoCad: 0,
            USU_NomeCad: "",
            CTAG_DataAgendamento: "",
            USU_CodigoAge: 0,
            USU_NomeAge: "",
            CTAG_DataConclusao: "",
            USU_CodigoCon: 0,
            USU_NomeCon: "",
            CTAG_DataDesativado: "",
            USU_CodigoDes: 0,
            USU_NomeDes: "",
            Atraso: 0,
          },
        ],
        Agendamento_Reuniao: [
          {
            CTAG_Evento: 0,
            CTEV_Descricao: "",
            CTAG_DataCadastro: "",
            USU_CodigoCad: 0,
            USU_NomeCad: "",
            CTAG_DataAgendamento: "",
            USU_CodigoAge: 0,
            USU_NomeAge: "",
            CTAG_DataConclusao: "",
            USU_CodigoCon: 0,
            USU_NomeCon: "",
            CTAG_DataDesativado: "",
            USU_CodigoDes: 0,
            USU_NomeDes: "",
            Atraso: 0,
          },
        ],
        Agendamento_ProjetoTecnico: [
          {
            CTAG_Evento: 0,
            CTEV_Descricao: "",
            CTAG_DataCadastro: "",
            USU_CodigoCad: 0,
            USU_NomeCad: "",
            CTAG_DataAgendamento: "",
            USU_CodigoAge: 0,
            USU_NomeAge: "",
            CTAG_DataConclusao: "",
            USU_CodigoCon: 0,
            USU_NomeCon: "",
            CTAG_DataDesativado: "",
            USU_CodigoDes: 0,
            USU_NomeDes: "",
            Atraso: 0,
          },
        ],
      },
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
      medidores: [
        { name: "João da Silva" },
        { name: "Pedro Lopes" },
        { name: "Marcio Viana" },
        { name: "Carlos Henrique" },
        { name: "Bruno Mendonça" },
        { name: "Jaqueline Soarez" },
        { name: "José Carlos" },
        { name: "Lucas Santos" },
      ],
      tecnicos: [
        { name: "João da Silva", ambientesExec: 20 },
        { name: "Pedro Lopes", ambientesExec: 13 },
        { name: "Marcio Viana", ambientesExec: 7 },
        { name: "Carlos Henrique", ambientesExec: 11 },
        { name: "Bruno Mendonça", ambientesExec: 9 },
        { name: "Jaqueline Sarez", ambientesExec: 23 },
        { name: "José Carlos", ambientesExec: 15 },
        { name: "Lucas Santos", ambientesExec: 5 },
      ],
      funcionariosGeral: [
        { header: "Vendedor" },
        { name: "Sandra Adams", group: "Vendedor" },
        { name: "Ali Connors", group: "Vendedor" },
        { name: "Trevor Hansen", group: "Vendedor" },
        { name: "Tucker Smith", group: "Vendedor" },
        { divider: true },
        { header: "Técnico" },
        { name: "João da Silva", group: "Técnico" },
        { name: "Pedro Lopes", group: "Técnico" },
        { name: "Marcio Viana", group: "Técnico" },
        { name: "Carlos Henrique", group: "Técnico" },
        { name: "Bruno Mendonça", group: "Técnico" },
        { name: "Jaqueline Soarez", group: "Técnico" },
        { name: "José Carlos", group: "Técnico" },
        { name: "Lucas Santos", group: "Técnico" },
        { divider: true },
        { header: "Medidor" },
        { name: "Britta Holt", group: "Medidor" },
        { name: "Jane Smith ", group: "Medidor" },
        { name: "John Smith", group: "Medidor" },
        { name: "Sandra Williams", group: "Medidor" },
      ],
      interessados: [],
    };
  },
  computed: {
    // cpuDateFormatted(dateTime) {
    //   console.log(dateTime);
    //   return this.formatDate(dateTime);
    // },
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let modo = 0;
      let payload = { Loja: top.LOJA_PADRAO, MesMinimo: 3 };
      ControleTecnico.getAgendamento(modo, payload).then((rt) => {
        this.eventos = rt;
      });
    },
    async loadExpanded({ item, value }) {
      if (value) {
        let modo = 1;
        let payload = {
          Loja: top.LOJA_PADRAO,
          Cliente: item.PRO_Cliente,
          Contrato: item.PRO_Contrato,
          MesMinimo: 3,
        };
        const { data } = await ControleTecnico.getAgendamento(modo, payload);
        this.evento = Object.assign({}, data);
        if (item.CTAG_DataConclusao_4 && item.CTAG_DataConclusao_4 != "") {
          this.stp = 0;
        } else if (
          item.CTAG_DataConclusao_3 &&
          item.CTAG_DataConclusao_3 != ""
        ) {
          this.stp = 5;
        } else if (
          item.CTAG_DataConclusao_2 &&
          item.CTAG_DataConclusao_2 != ""
        ) {
          this.stp = 4;
        } else if (
          item.CTAG_DataConclusao_1 &&
          item.CTAG_DataConclusao_1 != ""
        ) {
          this.stp = 3;
        } else if (
          item.CTAG_DataConclusao_0 &&
          item.CTAG_DataConclusao_0 != ""
        ) {
          this.stp = 2;
        } else {
          this.stp = 1;
        }
      }
    },
    getEvents({ start, end }) {
      const events = [];
      const min = new Date(`${start.date}T09:00:00`);
      const max = new Date(`${end.date}T17:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days - 20, days - 10);
      for (let i = 0; i < eventCount; i++) {
        const allDay = 1;
        const first = new Date(
          min.getFullYear(),
          min.getMonth(),
          this.rnd(min.getDate(), max.getDate()),
          9,
          0,
          0,
          0
        );
        const secondTemp = first;
        const second = new Date(
          secondTemp.setHours(secondTemp.getHours() + 10)
        );

        events.push({
          name: this.medidores[this.rnd(0, this.medidores.length - 1)].name,
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
    remove(item) {
      const index = this.interessados.indexOf(item.name);
      if (index >= 0) this.interessados.splice(index, 1);
    },
    formatDate(date) {
      if (!date) return null;
      var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const dt = new Date(date);
      return dt.toLocaleDateString("pt-BR", options);
    },
    overdue(date) {
      const dn = Date.now();
      const dateNow = new Date();
      const dateParam = new Date(this.formatDate(date));
      return dateNow > dateParam && date != "";
    },
    consoleImprimi() {
      console.log(top);
    },
  },
};
</script>