
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.overrideWebpackConfig(enableTailwind);
Config.setPort(3001); // Use port 3001 to avoid conflicts with common apps on 3000
