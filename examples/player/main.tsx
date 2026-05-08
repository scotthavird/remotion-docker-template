import { Player } from '@remotion/player';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelloWorldComposition } from '../../src/components/organisms/HelloWorldComposition';

const App: React.FC = () => (
  <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 20px' }}>
    <h1 style={{ fontSize: 28, marginBottom: 8 }}>Remotion Player Embed Demo</h1>
    <p style={{ color: '#595959', marginBottom: 24 }}>
      Plays the <code>HelloWorld</code> composition outside Remotion Studio. Pause, scrub, and resize the
      window — the player scales the canvas while preserving aspect ratio.
    </p>
    <Player
      component={HelloWorldComposition}
      durationInFrames={240}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      controls
      style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}
      inputProps={{
        title: 'Hello World',
        subtitle: 'Welcome to Remotion',
        contentHeader: 'Discover More',
        outroMessage: 'Thank You!',
      }}
    />
  </div>
);

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing #root element in index.html');
}
createRoot(root).render(<App />);
