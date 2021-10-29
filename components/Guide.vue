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

        <div class="text-body">
          Para utilizar a plataforma, primeiramente é necessário fazer a emissão
          de seu histórico pelo siga no menu de ensino. Após fazer a emissão, é
          preciso submeter seu histórico na plataforma e será identificado todas
          as disciplinas que você ainda precisa fazer. Em seguida, basta
          escolher quantos créditos você deseja realizar nos próximos semestre e
          pronto! O sistema realizará a recomendação de matérias para os
          próximos semestres.
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div class="text-h6 text-left text-md-center pb-4">
          Como é calculado
        </div>

        <div class="text-body">
          Para fazer o cálculo da recomendação de matrícula, primeiramente é
          identificado todas as disciplinas obrigatórias que o aluno ainda
          precisa fazer, em seguida, nosso algoritmo calcula quais disciplinas
          ele precisa cursar em cada semestre para se formar no menor tempo
          possível.
        </div>
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
