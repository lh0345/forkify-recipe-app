import View from "./view.js";
import previewView from "./previewView.js";
class resultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'We could not find recipes from your search. Please try another one!';
    _message = ''
    _generateMarkup(){
        return this._data.map(result => previewView.render(result, false)).join('');
        
    }
  addHandlerSortByDuration(handler) {
    document.querySelector('#sort-duration').addEventListener('click', handler);
  }

  addHandlerSortByIngredients(handler) {
    document.querySelector('#sort-ingredients').addEventListener('click', handler);
  }
}
export default new resultsView();