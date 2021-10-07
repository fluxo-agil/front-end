<template>
  <v-card
    class="pa-4 d-flex flex-column align-center justify-center"
    min-height="50vh"
  >
    <DocumentIcon class="mb-4" />

    <div class="mb-4">
      <template v-if="selectedFile">
        <div class="d-flex justify-center align-center">
          <span>{{ fileName }}</span>

          <v-btn :disabled="isLoading" icon small @click="deleteFile">
            <v-icon dense>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-text-field
          v-model="maxCreditsByPeriod"
          class="shrink mt-6 mb-3"
          hide-details
          type="number"
          outlined
          label="Créditos por semestre"
        />
      </template>

      <template v-else>
        Selecione seu
        <span class="font-weight-bold">Histórico Escolar</span>
      </template>
    </div>

    <v-btn
      color="primary"
      class="mb-4"
      rounded
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
