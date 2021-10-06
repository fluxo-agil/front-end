<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card
        class="pa-4 d-flex flex-column align-center justify-center"
        min-height="50vh"
        outlined
      >
        <DocumentIcon class="mb-4" />

        <div class="mb-4">
          <template v-if="selectedFile">
            <span>{{ fileName }}</span>

            <v-btn icon small @click="deleteFile">
              <v-icon dense>mdi-close</v-icon>
            </v-btn>
          </template>

          <template v-else>
            Arraste seu
            <span class="font-weight-bold">Histórico Escolar</span>
            ou
          </template>
        </div>

        <v-btn
          color="primary"
          class="mb-4"
          rounded
          :depressed="Boolean(selectedFile)"
          :outlined="Boolean(!selectedFile)"
          :loading="isLoading"
          width="135px"
          @click="onButtonClick"
        >
          <span>{{ buttonText }}</span>

          <v-icon v-if="selectedFile" class="ml-2" dense>
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

        <div v-if="selectedFile" class="mb-4"></div>
      </v-card>
    </v-col>
  </v-row>
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
      isLoading: false,
    };
  },

  computed: {
    buttonText() {
      return this.selectedFile ? "Enviar" : "Selecionar";
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
    onButtonClick() {
      if (this.selectedFile) {
        this.isLoading = true;
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
  },
};
</script>
