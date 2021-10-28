<template>
  <v-card class="d-flex flex-column" min-height="700px" :loading="isLoading">
    <v-container class="flex-grow-1 d-flex align-center" fluid>
      <v-row>
        <v-col
          class="d-flex flex-column justify-center"
          cols="12"
          :lg="selectedFile ? 4 : 12"
        >
          <v-row class="shrink" justify="center">
            <v-col class="text-center">
              <DocumentIcon />
            </v-col>
          </v-row>

          <v-row v-if="selectedFile" class="shrink">
            <v-col class="d-flex justify-center align-center">
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
            </v-col>
          </v-row>

          <v-row v-else justify="center">
            <v-col class="text-center" cols="12">
              <div>
                Selecione seu
                <span class="font-weight-bold">Histórico Escolar</span>
              </div>
            </v-col>

            <v-col class="text-center" cols="12">
              <v-btn color="primary" rounded outlined @click="uploadFile">
                <span>Selecionar</span>

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
        </v-col>

        <template v-if="selectedFile">
          <v-col cols="12" :lg="selectedFile ? 4 : 12">
            <v-row>
              <v-col cols="12">
                <div class="text-body-1 grey--text text--darken-1">
                  Quantos créditos deseja cursar em cada semestre?
                </div>
              </v-col>

              <v-col cols="12">
                <v-slider
                  v-model="maxCreditsByPeriod"
                  ticks
                  :thumb-size="24"
                  hide-details
                  thumb-label="always"
                  min="12"
                  max="32"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="text-body-1 grey--text text--darken-1">
                  Quais disciplinas optativas gostaria de cursar?
                </div>
              </v-col>

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

            <v-form
              ref="coursesWithSpecificPeriodForm"
              v-model="coursesWithSpecificPeriod.input.isValid"
            >
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
                    :rules="coursesWithSpecificPeriod.input.rules.will"
                    item-text="title"
                    return-object
                    required
                    suffix="cursar"
                  />
                </v-col>

                <v-col class="col-12 col-md-12">
                  <v-select
                    v-model="coursesWithSpecificPeriod.input.selected.course"
                    :items="coursesToSpecifyPeriod"
                    :rules="coursesWithSpecificPeriod.input.rules.course"
                    return-object
                    required
                    item-text="title"
                    prefix="a disciplina"
                  >
                    <template #selection="{ item }">
                      <span
                        class="text-right text-truncate"
                        style="width: 100%"
                      >
                        {{ item.title }}
                      </span>
                    </template>
                  </v-select>
                </v-col>

                <v-col class="col-12 col-md-12">
                  <v-select
                    v-model="coursesWithSpecificPeriod.input.selected.period"
                    :items="coursesWithSpecificPeriod.input.items.periods"
                    :rules="coursesWithSpecificPeriod.input.rules.period"
                    item-text="title"
                    return-object
                    required
                    suffix="semestre(s)"
                  >
                    <template #append-outer>
                      <v-btn
                        text
                        small
                        outlined
                        @click="addSpecificPeriodToCourse"
                      >
                        Adicionar
                      </v-btn>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-col cols="12" :lg="selectedFile ? 4 : 12">
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
                    {{ courseWithSpecificPeriod.will.title }} cursar
                    {{ courseWithSpecificPeriod.period.title }} semestre.
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
    </v-container>
    <v-card-actions v-if="selectedFile">
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="isLoading"
        min-width="250px"
        depressed
        @click="getRecommendation"
      >
        <span>{{ buttonText }}</span>

        <v-icon v-if="!isLoading" class="ml-2" dense> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-card-actions>
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
      selectedFile: null,
      maxCreditsByPeriod: 24,
      optionalCourses: {
        items: optionalCourses,
        input: "",
        selected: [],
      },
      coursesWithSpecificPeriod: {
        input: {
          items: {
            will: [
              {
                title: "Quero",
                value: true,
              },
              {
                title: "Não quero",
                value: false,
              },
            ],
            periods: [
              {
                title: "no próximo",
                value: 0,
              },
              {
                title: "daqui a 2",
                value: 1,
              },
              {
                title: "daqui a 3",
                value: 2,
              },
              {
                title: "daqui a 4",
                value: 3,
              },
              {
                title: "daqui a 5",
                value: 4,
              },
              {
                title: "daqui a 6",
                value: 5,
              },
            ],
          },
          selected: {
            will: null,
            course: null,
            period: null,
          },
          rules: {
            will: [(v) => v !== null || "Obrigatório"],
            course: [(v) => v !== null || "Obrigatório"],
            period: [(v) => v !== null || "Obrigatório"],
          },
          isValid: false,
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
      const filteredCorurses = this.optionalCourses.selected.filter(
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

      return filteredCorurses;
    },
  },

  watch: {
    selectedFile(file) {
      if (this.isLoading && !file) {
        this.isLoading = false;
      }
    },
    "optionalCourses.selected"(optionalCourses) {
      this.coursesWithSpecificPeriod.selected.forEach(
        (courseWithSpecificPeriod, index) => {
          const hasOptionalCourse = optionalCourses.find(
            (optionalCourse) =>
              optionalCourse.id === courseWithSpecificPeriod.course.id
          );

          if (hasOptionalCourse) {
            return true;
          }

          this.removeSpecificPeriodToCourse(index);
        }
      );
    },
  },

  methods: {
    uploadFile() {
      this.$refs.uploader.click();
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },

    deleteFile() {
      this.selectedFile = null;
      this.clearCoursesWithSpecificPeriodInput();
    },

    async getRecommendation() {
      this.isLoading = true;

      // TODO progressive loading
      this.interval = setInterval(() => {
        if (this.loadingTime === 100) {
          return (this.loadingTime = 0);
        }
        this.loadingTime += 10;
      }, 1000);

      const data = {
        file: this.selectedFile,
        max_credits_by_period: this.maxCreditsByPeriod,
      };
      // TODO format request
      if (this.optionalCourses.selected.length > 0) {
        Object.assign(data, {
          optional_courses: this.optionalCourses.selected.map(({ id }) => id),
        });
      }

      if (this.coursesWithSpecificPeriod.selected.length > 0) {
        Object.assign(data, {
          courses_with_specific_period: this.formatCoursesWithSpecificPeriod(
            this.coursesWithSpecificPeriod
          ),
        });
      }

      const response = await this.$store.dispatch("getRecommendation", data);

      if (response.status === 200) {
        this.$emit("update-recommendation", response.data);
      }

      this.isLoading = false;
    },

    clearCoursesWithSpecificPeriodInput() {
      this.$refs.coursesWithSpecificPeriodForm.reset();
    },

    addSpecificPeriodToCourse() {
      this.$refs.coursesWithSpecificPeriodForm.validate();

      if (!this.coursesWithSpecificPeriod.input.isValid) {
        return;
      }

      const course = this.coursesWithSpecificPeriod.input.selected;
      this.coursesWithSpecificPeriod.selected.push({ ...course });

      this.clearCoursesWithSpecificPeriodInput();
    },

    removeSpecificPeriodToCourse(courseIndex) {
      this.coursesWithSpecificPeriod.selected.splice(courseIndex, 1);
    },

    formatCoursesWithSpecificPeriod() {
      return this.coursesWithSpecificPeriod.selected.map(
        ({ will, period, course }) => ({
          take: will.value,
          course: course.id,
          period: period.value,
        })
      );
    },
  },
};
</script>

<style lang="scss">
.text-right input {
  text-align: right;
}
</style>
