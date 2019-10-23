import { configure, addParameters } from '@storybook/html';
import { themes } from '@storybook/theming';

function loadStories() {
  require('../stories/index.ts');
}

addParameters({
  options: {
    theme: themes.dark
  }
});

configure(loadStories, module);
