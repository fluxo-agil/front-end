<template>
  <div>
    <div class="text-h5" outlined>
      Cursando
      <strong>{{ recommendation.credits_by_period }} créditos</strong> em cada,
      serão necessários
      <strong>{{ recommendation.periods_to_graduate }} semestres</strong> para
      você se formar.
    </div>
    <div
      v-for="(period, index) in recommendation.periods"
      :key="index"
      class="mt-10"
      small
    >
      <h2 class="headline primary--text ma-1">{{ periodTitle(index) }}</h2>

      <div class="d-flex flex-row flex-wrap mt-3" outlined>
        <v-card
          v-for="course in period"
          :key="course.id"
          class="ma-1 pa-4"
          outlined
        >
          <div class="text-caption">
            {{ course.id }}
          </div>

          <div class="text-h6">
            {{ course.title }}
          </div>

          <div v-if="hasPrerequisites(course)" class="mt-1">
            <span class="text-body-2"> Pré-requisitos: </span>
            <v-chip
              v-for="(prerequisite, prerequisiteIndex) in course.prerequisites"
              :key="prerequisiteIndex"
              class="mx-1"
              outlined
              small
            >
              {{ prerequisite }}
            </v-chip>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendation: {
      type: Object,
      required: true,
    },
  },

  methods: {
    hasPrerequisites(course) {
      return course.prerequisites.length > 0;
    },

    periodTitle(periodIndex) {
      if (periodIndex === 0) {
        return "Próximo semestre";
      }

      return `${periodIndex + 1}º semestre`;
    },
  },
};
</script>
