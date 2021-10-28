<template>
  <v-card
    class="pa-0 d-flex flex-column align-center justify-center"
    min-height="600px"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12" :md="selectedFile ? 4 : 12">
          <v-row justify="center">
            <DocumentIcon />
          </v-row>

          <v-row v-if="selectedFile">
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

          <v-row v-else justify="center">
            <v-col class="col-12 text-center">
              Selecione seu
              <span class="font-weight-bold">histórico escolar</span>
            </v-col>
          </v-row>
        </v-col>

        <template v-if="selectedFile">
          <v-col cols="12" :md="selectedFile ? 4 : 12">
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
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <div class="text-body-1 grey--text text--darken-1 px-0">
                      Quais disciplinas optativas gostaria de cursar?
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="optionalCourses.selected"
                  :items="optionalCourses.items['6360/1']"
                  :search-input.sync="optionalCourses.input"
                  item-text="title"
                  return-object
                  placeholder="Nenhuma selecionada"
                  auto-select-first
                  multiple
                  outlined
                  @change="optionalCourses.input = ''"
                >
                  <template #selection="{ index }">
                    <span v-if="index === 0" class="grey--text">
                      {{ optionalCourses.selected.length }}
                      optativa(s) selecionadas
                    </span>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pb-0">
                <div class="text-body-1 grey--text text--darken-1 px-0">
                  Quer especificar em qual semestre cursar (ou não) uma
                  disciplina?
                </div>
              </v-col>

              <v-col class="col-12 col-md-12 pt-0">
                <v-select
                  v-model="coursesWithSpecificPeriod.input.selected.will"
                  :items="coursesWithSpecificPeriod.input.items.will"
                  suffix="cursar"
                  hide-details
                />
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-select
                  v-model="coursesWithSpecificPeriod.input.selected.course"
                  :items="coursesToSpecifyPeriod"
                  return-object
                  item-text="title"
                  prefix="a disciplina"
                  hide-details
                >
                  <template #selection="{ item }">
                    <span class="text-right text-truncate" style="width: 100%">
                      {{ item.title }}
                    </span>
                  </template>
                </v-select>
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-select
                  v-model="coursesWithSpecificPeriod.input.selected.period"
                  :items="coursesWithSpecificPeriod.input.items.periods"
                  suffix="semestre(s)"
                  hide-details
                  append-outer-icon="mdi-plus"
                  @click:append-outer="addSpecificPeriodToCourse"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" :md="selectedFile ? 4 : 12">
            <v-list two-line>
              <v-list-item
                v-for="(
                  courseWithSpecificPeriod, index
                ) in coursesWithSpecificPeriod.selected"
                :key="courseWithSpecificPeriod.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ courseWithSpecificPeriod.course.title }}
                  </v-list-item-title>

                  <v-list-item-subtitle>
                    {{ courseWithSpecificPeriod.will }} cursar
                    {{ courseWithSpecificPeriod.period }} semestre.
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="removeSpecificPeriodToCourse(index)">
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </template>
      </v-row>

      <v-row justify="center">
        <v-col class="d-flex justify-center" cols="4">
          <v-btn
            color="primary"
            rounded
            :block="Boolean(selectedFile)"
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import DocumentIcon from "@/assets/document.svg?inline";
import optionalCourses from "@/static/optionalCourses.json";

export default {
  components: {
    DocumentIcon,
  },

  data() {
    return {
      selectedFile: true,
      maxCreditsByPeriod: 24,
      optionalCourses: {
        items: optionalCourses,
        input: "",
        selected: [],
      },
      coursesWithSpecificPeriod: {
        input: {
          items: {
            will: ["Quero", "Não quero"],
            periods: ["no próximo", "daqui a 2", "daqui a 3"],
          },
          selected: {
            will: null,
            course: null,
            period: null,
          },
        },
        selected: [],
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
    coursesToSpecifyPeriod() {
      const filteredCo1urses = this.optionalCourses.selected.filter(
        (course) => {
          const alreadyAddedCourse =
            this.coursesWithSpecificPeriod.selected.find(
              (courseAdded) => courseAdded.course.id === course.id
            );

          if (alreadyAddedCourse) {
            return false;
          }

          return true;
        }
      );

      return filteredCo1urses;
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

    clearCoursesWithSpecificPeriodInput() {
      this.coursesWithSpecificPeriod.input.selected = {
        will: null,
        course: null,
        period: null,
      };
    },

    addSpecificPeriodToCourse() {
      const course = this.coursesWithSpecificPeriod.input.selected;
      this.coursesWithSpecificPeriod.selected.push({ ...course });

      this.clearCoursesWithSpecificPeriodInput();
    },

    removeSpecificPeriodToCourse(courseIndex) {
      this.coursesWithSpecificPeriod.selected.splice(courseIndex, 1);
    },
  },
};
</script>

<style lang="scss">
.text-right input {
  text-align: right;
}
</style>
