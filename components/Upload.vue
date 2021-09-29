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

        <v-btn rounded depressed color="primary"> Selecione </v-btn>
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
};
</script>
