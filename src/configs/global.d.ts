interface EnvConfig {
  host: string;
  encode: boolean;
}
interface AllEnvConfigs {
  local: EnvConfig;
  sim: EnvConfig;
  mock: EnvConfig;
  production: EnvConfig;
}
