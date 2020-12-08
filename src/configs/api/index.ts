import envConfig from '../env.conf';

const API_ENV = process.env.API_ENV;
export const currentEnvConfig: EnvConfig = envConfig?.[API_ENV]
  ? ((envConfig[API_ENV] as unknown) as EnvConfig)
  : ((envConfig.production as unknown) as EnvConfig);

export const allEnvConfigs: AllEnvConfigs = (envConfig as unknown) as AllEnvConfigs;
