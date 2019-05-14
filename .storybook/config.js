import { configure } from '@storybook/html';

function loadStories() {
  require('../stories/index.ts');
}

configure(loadStories, module);
