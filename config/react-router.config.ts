import type {Config} from '@react-router/dev/config';

export default {
  ssr: true,
  appDirectory: 'app',
  buildDirectory: 'dist',
  future: {
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
