/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" defaultPosition="left"
    changePositionKey="ctrl-q" defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
