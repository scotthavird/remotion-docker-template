import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import fs from 'fs';
import { createRequire } from 'node:module';
import path from 'path';

const require = createRequire(import.meta.url);

// Ensure output directory exists
const outputDir = './out';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Starting Remotion bundling...');

const bundled = await bundle({
  entryPoint: require.resolve('./src/index.tsx'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  webpackOverride: (config) => config,
});

console.log('Bundle created successfully');

// Get input props from environment variables or use defaults
const inputProps = {
  title: process.env.TITLE || 'Hello World',
  subtitle: process.env.SUBTITLE || 'Welcome to Remotion',
  contentHeader: process.env.CONTENT_HEADER || 'Discover More',
  outroMessage: process.env.OUTRO_MESSAGE || 'Thank You!'
};

console.log('Input props:', inputProps);

console.log('Selecting composition...');

const composition = await selectComposition({
  serveUrl: bundled,
  id: 'HelloWorld',
  inputProps,
});

console.log(`Found composition: ${composition.id}`);
console.log(`Duration: ${composition.durationInFrames} frames (${composition.durationInFrames / composition.fps}s)`);
console.log(`Dimensions: ${composition.width}x${composition.height}`);
console.log('Starting to render video...');

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

console.log(`✅ Video rendered successfully!`);
console.log(`📁 Output location: ${path.resolve(outputPath)}`);
console.log(`🎬 Video: ${composition.width}x${composition.height}, ${composition.durationInFrames / composition.fps}s`); 