import BaseComponent from "../../utils/component/baseComponent";
import Template from './index.html';
import './style.scss';

export class Popup extends BaseComponent {
  private popup: HTMLDivElement;
  private popupContainer: HTMLDivElement;
  private popupBtn: HTMLButtonElement;

  constructor(parentNode: HTMLElement | null) {
    super('div', ['modal'], parentNode, Template, {});
    this.determineElements()
    this.initEventListeners();
  }

  private determineElements() {
    this.popup = this.node.querySelector('popup');
    this.popupContainer = this.node.querySelector('popup-container');
    this.popupBtn = this.node.querySelector('popup__button');
  }

  private initEventListeners() {
    this.popupBtn.addEventListener('click', () => {
      console.log('click')
      this.popup.classList.add('active')
    })
  }
}