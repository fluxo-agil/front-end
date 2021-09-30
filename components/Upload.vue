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
          Arraste seu
          <span class="font-weight-bold">Histórico Escolar</span>
          ou
        </div>

        <v-btn
          rounded
          :depressed="selectedFile"
          :outlined="!selectedFile"
          color="primary"
          max-width="100%"
          @click="onButtonClick"
        >
          <span v-if="selectedFile">Enviar&nbsp;</span>

          <span class="file__name">{{ buttonText }}</span>

          <v-icon v-if="selectedFile" class="ml-2">mdi-cloud-upload</v-icon>
        </v-btn>

        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="application/pdf"
          @change="onFileChanged"
        />
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
      preco: 50,
      defaultButtonText: "Selecione",
    };
  },

  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
    buttonColor() {
      return this.selectedFile && "primary";
    },
  },

  methods: {
    onButtonClick() {
      this.$refs.uploader.click();
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>
