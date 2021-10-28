export const actions = {
  async getRecommendation(context, data) {
    const bodyFormData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }

    const response = await this.$axios.post("/process", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};
