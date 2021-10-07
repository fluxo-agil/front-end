export const actions = {
  async getRecommendation(context, file) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);

    const response = await this.$axios.post("/process", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};
