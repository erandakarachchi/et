const API_URL = "https://mvku1vlwcg.execute-api.us-east-1.amazonaws.com/prod";

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`);
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
