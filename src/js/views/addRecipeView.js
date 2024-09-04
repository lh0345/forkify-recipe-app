import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = this._parentElement.querySelector('.btn--upload');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._textInput = document.querySelector('.textString');
      this._urlInput = document.querySelector('.urlLink');
        this._imageInput = document.querySelector('.imageLink');
        this._btnUpload = this._parentElement.querySelector('.upload__btn');
        this._textInput.addEventListener('input', this._validateFields.bind(this));
      }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _validateFields() {
    const _text = this._textInput.value;
    const lettersOnly = /^[a-zA-Z]+$/;
    if (lettersOnly.test(_text) && this._urlInput.checkValidity() && this._imageInput.checkValidity()) {
        this._btnUpload.removeAttribute('disabled');
    }
}

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

_generateMarkup() { }
    getUrlValue() {
        return this._urlInput.value;
    }
    getImageValue() {
        return this._imageInput.value;
    }
}
export default new AddRecipeView();


export const getUrlValue = () => AddRecipeView.getUrlValue();
export const getImageValue = () => AddRecipeView.getImageValue();