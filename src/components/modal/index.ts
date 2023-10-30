import BaseComponent from "../../utils/component/baseComponent";
import { comeBackScrollShifting, removeScrollShifting } from "../../utils/helpers/scroll";
import Template from './index.html';
import './style.scss';

export class Popup extends BaseComponent {
  private popup: HTMLDivElement;
  private popupBtn: HTMLButtonElement;
  private popupContent: HTMLDivElement;

  constructor(parentNode: HTMLElement | null) {
    super('div', ['modal'], parentNode, Template, {});
    this.determineElements()
    this.initEventListeners();
  }

  private determineElements() {
    this.popup = this.node.querySelector('.popup');
    this.popupContent = this.node.querySelector('.popup-content')
    this.popupBtn = this.node.querySelector('.popup__button');
  }

  private initEventListeners() {
    const closeModal = () => {
      setTimeout(() => {
        comeBackScrollShifting()
      }, 300)
      this.popup.classList.remove('active')
      this.popupContent.classList.remove('active')
    }
    const openModal = () => {
      removeScrollShifting()
      this.popupContent.classList.add('active')
      this.popup.classList.add('active')
    }
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    const closeOnCLick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal()
      }
    }

    this.popup.addEventListener('click', closeOnCLick)
    this.popupBtn.addEventListener('click', openModal)
    document.addEventListener('keyup', closeOnEscape)
    
  }
}