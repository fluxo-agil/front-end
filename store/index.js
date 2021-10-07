export const actions = {
  async getRecommendation(context, { file, maxCreditsByPeriod }) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("max_credits_by_period", maxCreditsByPeriod);

    const response = await this.$axios.post("/process", bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};
