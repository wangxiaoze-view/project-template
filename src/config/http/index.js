export const axiosOptions_config = {
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 60000,
};

export const responseCode_config = {
  BUSINESS_ERROR: ['0x00000002'],
  TOKEN_EXPIRED: ['0x00000111', '0x00000109', '0x00000112', '0x00000113'],
  SYSTEM_ERROR: ['0x00000001'],
};
