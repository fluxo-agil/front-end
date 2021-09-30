<template>
  <div>
    <div class="text-h5 text-center font-weight-bold py-8">Como utilizar</div>

    <v-row>
      <v-col v-for="item in items" :key="item.title" cols="12" md="4">
        <div class="text-h6 text-left text-md-center pb-4">
          {{ item.title }}
        </div>

        <div class="text-body">
          {{ item.content }}
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
          title: "Título 1",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ab quibusdam possimus corrupti consectetur adipisci cum sit! Corporis, neque pariatur! Harum fugiat reiciendis blanditiis quaerat ea? Natus odio voluptatibus commodi.",
        },
        {
          title: "Título 2",
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
