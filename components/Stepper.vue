<template>
  <v-stepper v-model="stepper" outlined min-height="50vh">
    <v-stepper-content step="1">
      <Upload @update-recommendation="updateRecommendation" />
    </v-stepper-content>
    <v-stepper-content step="2">
      <Recommendation :recommendation="recommendation" />
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      stepper: 2,
      recommendation: {
        credits_by_period: 20,
        periods_to_graduate: 5,
        periods: [
          [
            {
              title: "Métodos de Desenvolvimento de Software",
              id: 0,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
            {
              title: "Disciplina 2",
              id: 1,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
            {
              title: "Métodos de Desenvolvimento de Software",
              id: 0,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
            {
              title: "Disciplina 2",
              id: 1,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
            {
              title: "Métodos de Desenvolvimento de Software",
              id: 0,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
          ],
          [
            {
              title: "Disciplina 3",
              id: 2,
              prerequisites: [],
            },
            {
              title: "Disciplina 4",
              id: 3,
              prerequisites: ["ASAS03", "SDSDS03"],
            },
          ],
        ],
      },
    };
  },

  watch: {
    recommendation(newValue) {
      if (newValue) {
        this.stepper = 1;
        return;
      }

      this.stepper = 2;
    },
  },

  methods: {
    updateRecommendation(recommendation) {
      this.recommendation = recommendation;
    },
  },
};
</script>
