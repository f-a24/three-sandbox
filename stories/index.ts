import { storiesOf } from '@storybook/html';
import { document } from 'global';
import { chapter, appendix } from './chapter';

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

Object.keys(appendix).forEach(ap => {
  appendix[ap].forEach(n => {
    storiesOf(`Appendix-${ap}`, module).add(`${n}`, () => {
      import(`../src/appendix-${ap}/${n}`).then(module => {
        document.body.innerHTML =
          '<div id="WebGL-output"></div><div id="Stats-output"></div>';
        module.default();
      });
      return '';
    });
  });
});
