export const actions = {
  async getRecommendation(context, data) {
    const bodyFormData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      const formattedValue = key === "file" ? value : JSON.stringify(value);
      bodyFormData.append(key, formattedValue);
    }

    const response = await this.$axios.post("/process", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};
