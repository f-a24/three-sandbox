import { storiesOf } from '@storybook/html';
import { document } from 'global';
import chapter from './chapter';

Object.keys(chapter).forEach(ch => {
  chapter[ch].forEach(n => {
    storiesOf(`Chapter${ch}`, module).add(`${n}`, () => {
      import(`../src/chapter${ch}/${n}`).then(module => {
        document.body.innerHTML =
          '<div id="WebGL-output"></div><div id="Stats-output"></div>';
        module.default();
      });
      return '';
    });
  });
});
