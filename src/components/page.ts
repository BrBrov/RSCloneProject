import '../assets/svg/git.svg';
import '../assets/png/rss.png';
import './page.scss';
import { ISong, songs } from './types';

export default class Page {
  private body: HTMLElement;

  constructor() {
    this.body = document.body;
    this.init();
  }

  public start(): void {
    console.log('Page created!');
  }

  private init(): void {
    const pageContainer: HTMLElement = document.createElement('div');
    pageContainer.className = 'container';

    const page: HTMLElement = document.createElement('div');
    page.className = 'wrapper';

    pageContainer.append(page);

    const top = document.createElement('div');
    top.className = 'top';

    page.append(top);

    const footer = document.createElement('footer');
    footer.className = 'footer';

    this.createFooter(footer);

    page.append(footer);

    const left = document.createElement('div');
    left.className = 'top__left-side';

    this.createLeftSide(left);

    top.append(left);

    const right = document.createElement('div');
    right.className = 'top__right-side';

    this.createRightSide(right);

    top.append(right);

    this.body.append(pageContainer);
    console.log(this.body);
  }

  private createFooter(footer: HTMLElement): void {
    let wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'footer__git-wrapper';

    let img: HTMLImageElement = document.createElement('img');
    img.className = 'footer__git-img';
    img.alt = 'Git';
    img.src = './assets/svg/git.svg';

    img.addEventListener('click', (): void => {
      location.href = 'https://github.com/BrBrov/RSClone';
    });

    wrapper.append(img);
    footer.append(wrapper);

    wrapper = document.createElement('div');
    wrapper.className = 'footer__rs-wrapper';

    img = document.createElement('img');
    img.className = 'footer__rs-img';
    img.alt = 'RSSchool';
    img.src = './assets/png/rss.png';

    img.addEventListener('click', (): void => {
      location.href = 'https://rs.school';
    });

    wrapper.append(img);
    footer.append(wrapper);
  }

  private createLeftSide(left: HTMLElement): void {
    let container: HTMLElement = document.createElement('div');
    container.className = 'top__left-menu';

    left.append(container);

    container = document.createElement('div');
    container.className = 'top__player-wrapper';

    left.append(container);
  }

  private createRightSide(right: HTMLElement): void {
    let container: HTMLElement = document.createElement('header');
    container.className = 'top__header';

    right.append(container);

    container = document.createElement('main');
    container.className = 'top__main';
    this.putListSongs(container, songs, 'First song');

    right.append(container);
  }

  private putListSongs(parent: HTMLElement, items: Array<ISong>, title: string): void {
    console.log('main');
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'listSong__wrapper';
    const titleElem: HTMLElement = document.createElement('h2');
    titleElem.className = 'listSong__title';
    titleElem.innerHTML = title;
    wrapper.append(titleElem);
    const list: HTMLElement = document.createElement('div');
    list.className = 'listSong__items';
    wrapper.append(list);
    for (let i = 0; i < items.length; i += 1) this.oneSong(list, items[i]);
    parent.append(wrapper);
  }

  private oneSong(parent: HTMLElement, song: ISong): void {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'oneSong__item';
    const img: HTMLImageElement = document.createElement('img');
    img.className = 'oneSong__img';
    img.alt = song.title;
    img.src = song.logo;
    const title: HTMLElement = document.createElement('div');
    title.className = 'oneSong__title';
    title.innerHTML = song.title;
    wrapper.append(img);
    wrapper.append(title);
    parent.append(wrapper);
  }
}
