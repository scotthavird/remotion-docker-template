import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind-v4';
import fs from 'fs';
import { createRequire } from 'node:module';
import path from 'path';

const require = createRequire(import.meta.url);

const outputDir = './out';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const compositionId = process.env.COMPOSITION_ID || 'HelloWorld';

const inputPropsByComposition = {
  HelloWorld: {
    title: process.env.TITLE || 'Hello World',
    subtitle: process.env.SUBTITLE || 'Welcome to Remotion',
    contentHeader: process.env.CONTENT_HEADER || 'Discover More',
    outroMessage: process.env.OUTRO_MESSAGE || 'Thank You!',
  },
  TransitionsDemo: {
    sceneOneText: process.env.SCENE_ONE_TEXT || 'Welcome',
    sceneTwoText: process.env.SCENE_TWO_TEXT || 'Built with Remotion',
    sceneThreeText: process.env.SCENE_THREE_TEXT || 'Render Anywhere',
  },
  CaptionsDemo: {
    srtPath: process.env.SRT_PATH || 'captions/sample.srt',
  },
};

const inputProps = inputPropsByComposition[compositionId];
if (!inputProps) {
  console.error(
    `Unknown COMPOSITION_ID "${compositionId}". Valid values: ${Object.keys(inputPropsByComposition).join(', ')}`,
  );
  process.exit(1);
}

console.log(`Rendering composition: ${compositionId}`);
console.log('Input props:', inputProps);
console.log('Bundling...');

const bundled = await bundle({
  entryPoint: require.resolve('./src/index.tsx'),
  webpackOverride: (config) => enableTailwind(config),
  publicDir: path.resolve('./public'),
});

console.log('Bundle ready. Selecting composition...');

const composition = await selectComposition({
  serveUrl: bundled,
  id: compositionId,
  inputProps,
});

console.log(`Found composition: ${composition.id}`);
console.log(
  `Duration: ${composition.durationInFrames} frames (${composition.durationInFrames / composition.fps}s)`,
);
console.log(`Dimensions: ${composition.width}x${composition.height}`);
console.log('Rendering...');

const outputPath = path.join(outputDir, `${composition.id}.mp4`);

await renderMedia({
  codec: 'h264',
  composition,
  serveUrl: bundled,
  outputLocation: outputPath,
  chromiumOptions: {
    enableMultiProcessOnLinux: true,
  },
  inputProps,
});

console.log('Video rendered successfully');
console.log(`Output: ${path.resolve(outputPath)}`);
console.log(
  `Spec: ${composition.width}x${composition.height}, ${composition.durationInFrames / composition.fps}s`,
);
