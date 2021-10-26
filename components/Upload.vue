<template>
  <v-card
    class="pa-0 d-flex flex-column align-center justify-center"
    min-height="75vh"
  >
    <v-container fluid>
      <v-row justify="center">
        <DocumentIcon />
      </v-row>

      <v-row justify="center">
        <v-col class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-3">
          <template v-if="selectedFile">
            <v-row class="mb-4">
              <v-col>
                <div class="d-flex justify-center align-center">
                  <span class="text-body-1">{{ fileName }}</span>

                  <v-btn
                    class="ml-1"
                    :disabled="isLoading"
                    icon
                    small
                    @click="deleteFile"
                  >
                    <v-icon dense>mdi-close</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <div class="text-body-1 grey--text text--darken-1 px-0">
                  Quantos créditos deseja cursar em cada semestre?
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-slider
                  v-model="maxCreditsByPeriod"
                  ticks
                  :thumb-size="24"
                  hide-details
                  thumb-label="always"
                  min="6"
                  max="32"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="col-12 pb-0">
                <div class="text-body-1 grey--text text--darken-1 px-0">
                  Quer especificar em qual semestre cursar (ou não) uma
                  disciplina?
                </div>
              </v-col>

              <v-col class="col-12 col-md-12 pt-0">
                <v-select :items="form.will" suffix="cursar" hide-details />
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-select
                  :items="form.courses"
                  prefix="a disciplina"
                  hide-details
                >
                  <template #selection="{ item }">
                    <span class="text-right text-truncate" style="width: 100%">
                      {{ item }}
                    </span>
                  </template>
                </v-select>
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-select
                  :items="form.periods"
                  suffix="semestre(s)"
                  hide-details
                />
              </v-col>
            </v-row>
          </template>

          <template v-else>
            <v-row>
              <v-col class="col-12 text-center">
                Selecione seu
                <span class="font-weight-bold">Histórico Escolar</span>
              </v-col>
            </v-row>
          </template>

          <v-row class="mt-4">
            <v-col class="col-sm-12">
              <v-btn
                color="primary"
                rounded
                block
                :depressed="Boolean(selectedFile)"
                :outlined="Boolean(!selectedFile)"
                :disabled="isLoading"
                @click="onButtonClick"
              >
                <span>{{ buttonText }}</span>

                <v-icon v-if="selectedFile && !isLoading" class="ml-2" dense>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>

              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="application/pdf"
                @change="onFileChanged"
              />

              <div v-if="isLoading" class="mb-4">
                <v-progress-circular
                  slot="loader"
                  size="32"
                  :rotate="180"
                  :value="loadingTime"
                  color="primary"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DocumentIcon from "@/assets/document.svg?inline";

export default {
  components: {
    DocumentIcon,
  },

  data() {
    return {
      selectedFile: null,
      maxCreditsByPeriod: 24,
      form: {
        will: ["Quero", "Não quero"],
        courses: ["Requisitos de Software", "Interação Humano-Computador"],
        periods: ["no próximo", "daqui a 2", "daqui a 3"],
      },
      isLoading: false,
      loadingTime: 0,
      interval: {},
    };
  },

  computed: {
    buttonText() {
      if (!this.selectedFile) {
        return "Selecionar";
      }
      if (this.isLoading) {
        return "Processando...";
      }

      return "Receber recomendação";
    },
    buttonColor() {
      return this.selectedFile && "primary";
    },
    fileName() {
      return this.selectedFile ? this.selectedFile.name : "";
    },
  },

  watch: {
    selectedFile(file) {
      if (this.isLoading && !file) {
        this.isLoading = false;
      }
    },
  },

  methods: {
    async onButtonClick() {
      if (this.selectedFile) {
        await this.getRecommendation();
        return;
      }

      this.$refs.uploader.click();
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },

    deleteFile() {
      this.selectedFile = null;
    },

    async getRecommendation() {
      this.isLoading = true;
      this.interval = setInterval(() => {
        if (this.loadingTime === 100) {
          return (this.loadingTime = 0);
        }
        this.loadingTime += 10;
      }, 1000);

      const response = await this.$store.dispatch("getRecommendation", {
        file: this.selectedFile,
        maxCreditsByPeriod: this.maxCreditsByPeriod,
      });

      if (response.status === 200) {
        this.$emit("update-recommendation", response.data);
      }

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
.text-right input {
  text-align: right;
}
</style>
