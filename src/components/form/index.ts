import { sendForm } from "../../utils/api/api";
import BaseComponent from "../../utils/component/baseComponent";
import { displayErrorBlock, hideErrorBlock } from "../../utils/helpers/elementInteraction";
import Template from './index.html';
import './style.scss';

enum FormInputs {
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
  MSG = 'message',
}

export class Form extends BaseComponent {
  private isDirty: boolean = false;
  private form: HTMLFormElement;
  private button: HTMLButtonElement;
  private formMessage: HTMLParagraphElement;

  constructor(parentNode: HTMLElement | null) {
    super('div', ['form-container'], parentNode, Template, {});
    this.determineFormElements();
    this.initEventListeners()
  }

  private determineFormElements(): void {
    this.form = this.node.querySelector("form")
    this.button = this.node.querySelector("button")
    this.formMessage = this.node.querySelector(".form__message")
  }

  private showErrors(fields: Record<string, string>) {
    for (let input in fields) {
      displayErrorBlock(input, fields[input])
    }
  }

  private hideErrors() {
    hideErrorBlock()
  }

  private initEventListeners() {
    this.initFormListeners();
  }

  private initFormListeners() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      this.hideFormMessage()
      this.btnDisableHandler(true)
      if (this.isDirty) {
        this.hideErrors()
      }
      const response = await sendForm(new FormData(this.form));
      this.btnDisableHandler(false)
      this.isDirty = true;

      if (response.status === 'error') {
        this.showErrors(response.fields)
      } else {
        this.showFormMessage('Form has been submitted successfully');
        this.resetForm()
      }
    })
  }

  private showFormMessage(msg: string) {
    this.formMessage.classList.remove('form__message_hidden')
    this.formMessage.textContent = msg;
  }

  private hideFormMessage() {
    this.formMessage.classList.add('form__message_hidden')
  }

  private resetForm() {
    this.form.reset();
  }

  private btnDisableHandler(isDisabled: boolean) {
    this.button.disabled = isDisabled;
  }
}