import { MdeditorPage } from './app.po';

describe('mdeditor App', function() {
  let page: MdeditorPage;

  beforeEach(() => {
    page = new MdeditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
