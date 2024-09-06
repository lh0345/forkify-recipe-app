import View from './view.js';
class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)';
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnOpen1 = document.querySelector('.nav__btn--add-recipe1');
    _btnClose = document.querySelector('.btn--close-modal');

    //Te shtuarat
    constructor() {
        super();
        this._textInput = document.querySelector('.textString');
        this._urlInput = document.querySelector('.urlLink');
        this._imageInput = document.querySelector('.imageLink');
        this._btnUpload = this._parentElement.querySelector('.upload__btn');
    
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    

        this._textInput.addEventListener('input', this._validateFields.bind(this));
        this._urlInput.addEventListener('input', this._validateFields.bind(this));
        this._imageInput.addEventListener('input', this._validateFields.bind(this));
    }
    //
    
    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }
    //Te shtuarat
    _validateFields() {
        const _text = this._textInput.value;
        const lettersOnly = /^[a-zA-Z]+$/;
        console.log('_validateFields called');
        if (lettersOnly.test(_text) && this._urlInput.checkValidity() && this._imageInput.checkValidity()) {
            console.log('Form is valid, enabling submit button');
            this._btnUpload.removeAttribute('disabled');
        } else {
            console.log('Form is invalid, disabling submit button');
            this._btnUpload.setAttribute('disabled', 'true');
        }
    }
    
    //

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
        this._btnOpen1.addEventListener('click', this.toggleWindow.bind(this));
    }
    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
    //Te shtuarat
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
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
function getUsername() {
    return localStorage.getItem('username');
  }
  
  // Event listener that runs when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const username = getUsername();
    if (username) {
      document.getElementById('publisher').value = username;
      document.getElementById('publisher').setAttribute('readonly', 'true');
    }
  });
//

const RecipeView = new AddRecipeView();
export default RecipeView;
//Te shtuarat
export const getUrlValue = () => RecipeView.getUrlValue();
export const getImageValue = () => RecipeView.getImageValue();
//