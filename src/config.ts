import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    data_base: {
      name: process.env.DATA_BASE3,
      port: process.env.DATA_BASE3_PORT,
    },
    api_key: process.env.API_KEY3,
  };
});
