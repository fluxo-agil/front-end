<template>
  <div>
    <div class="text-h5 text-center font-weight-bold py-8">Como utilizar</div>

    <v-row>
      <v-col cols="12" md="4">
        <div class="text-h6 text-left text-md-center pb-4">Como funciona</div>

        <div class="text-body">
          O Fluxo Ágil oferece, aos estudantes da Universidade de Brasília, uma
          recomendação de quais disciplinas cursar nos próximos semestres para
          que você se forme no menor tempo possível seguindo a quantidade de
          créditos que deseja cursar.
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div class="text-h6 text-left text-md-center pb-4">
          Como obter seu histórico
        </div>

        <div class="text-body">a</div>
      </v-col>

      <v-col cols="12" md="4">
        <div class="text-h6 text-left text-md-center pb-4">
          Como é calculado
        </div>

        <div class="text-body">a</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Como funciona",
          content:
            "O Fluxo Ágil oferece, aos estudantes da Universidade de Brasília, uma recomendação de quais disciplinas cursar nos próximos semestres para que você se forme no menor tempo possível seguindo a quantidade de créditos que deseja cursar.",
        },
        {
          title: "Como obter seu histórico",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ab quibusdam possimus corrupti consectetur adipisci cum sit! Corporis, neque pariatur! Harum fugiat reiciendis blanditiis quaerat ea? Natus odio voluptatibus commodi.",
        },
        {
          title: "Título 3",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ab quibusdam possimus corrupti consectetur adipisci cum sit! Corporis, neque pariatur! Harum fugiat reiciendis blanditiis quaerat ea? Natus odio voluptatibus commodi.",
        },
      ],
    };
  },
};
</script>
