<template>
  <v-stepper v-model="stepper" outlined min-height="50vh">
    <v-stepper-content step="1">
      <Upload @update-recommendation="updateRecommendation" />
    </v-stepper-content>
    <v-stepper-content step="2">
      <Recommendation v-if="recommendation" :recommendation="recommendation" />
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      stepper: 1,
      recommendation: null,
    };
  },

  methods: {
    updateRecommendation(recommendation) {
      this.recommendation = recommendation;

      if (this.recommendation) {
        this.stepper = 2;
      }
    },
  },
};
</script>
