import App from '../js/App';

describe('App', () => {
  it('App("World") to be "<h1>Hello World!!</h1>"', () => {
    expect(App('World')).toBe('<h1>Hello World!!</h1>');
  });
});
