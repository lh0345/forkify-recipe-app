import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import RecipeView from './views/addRecipeView.js';

// Initialization and handlers
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  const usernameLabel = document.getElementById('usernameLabel');

  if (usernameLabel) {
    const username = localStorage.getItem('username');
    usernameLabel.textContent = username ? `Welcome, ${username}` : 'Welcome, Guest';
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('username');
      window.location.href = '../register.html';
    });
  } else {
    console.error('Logout button not found in the DOM');
  }
});

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    RecipeView.renderSpinner();
    RecipeView._btnUpload.disabled = true;
    RecipeView._btnUpload.style.color = 'gray';
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    RecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => RecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    RecipeView.renderError(err.message);
  }
};

const controlSortByDuration = function() {
  model.sortRecipesByDuration();
  resultsView.render(model.getSearchResultsPage());
};

const controlSortByIngredients = function() {
  model.sortRecipesByIngredients();
  resultsView.render(model.getSearchResultsPage());
};

// const controlVegetarianFilter = function () {
//   model.filterVegetarianRecipes();
//   resultsView.render(model.getSearchResultsPage());
// };

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const searchIcon = document.querySelector('.search-icon');
    const closeIcon = document.querySelector('.close-icon');
    const searchBar = document.querySelector('.search__field');
    const dropD = document.querySelector('.dropdown');
    const searchToggle = document.querySelector('.search-toggle');
    const previews = document.querySelectorAll('.preview__link'); // Changed to select all preview links
    const searchResults = document.querySelector('.search-results');
    const recipeResults = document.querySelector('.recipe');
    const toggleIcon = document.getElementById('toggle-icon');
    const searchInput = document.querySelector('.search');

    // Initial state setup
    recipeResults.style.display = 'none'; // Hide recipe at the start
    searchInput.style.display = 'none';
    if (searchResults) searchResults.style.display = 'none';

    if (searchIcon && closeIcon && searchBar && dropD && searchInput) {
      searchIcon.addEventListener('click', function () {
        searchBar.style.display = 'block';
        searchIcon.style.display = 'none';
        closeIcon.style.display = 'inline-block';
        searchInput.style.display = 'block';
        dropD.style.display = 'none';
        searchResults.style.display = 'flex'; // Show search results
        recipeResults.style.display = 'none'; // Hide recipe results
      });

      closeIcon.addEventListener('click', function () {
        searchBar.style.display = 'none';
        searchIcon.style.display = 'inline-block';
        closeIcon.style.display = 'none';
        dropD.style.display = 'block';
        searchInput.style.display = 'none';
        searchResults.style.display = 'none'; // Hide search results
        recipeResults.style.display = 'block'; // Show recipe results
      });
    }

    if (searchToggle && searchResults && recipeResults && toggleIcon) {
      searchToggle.addEventListener('click', function () {
        if (searchResults.style.display === 'none' || searchResults.style.display === '') {
          searchResults.style.display = 'flex';
          recipeResults.style.display = 'none';
          toggleIcon.classList.replace('fa-arrows-left-right', 'fa-arrows-left-right-to-line');
        } else {
          searchResults.style.display = 'none';
          recipeResults.style.display = 'block';
          toggleIcon.classList.replace('fa-arrows-left-right-to-line', 'fa-arrows-left-right');
        }
      });
    }

    // Handling clicks on preview links
    if (previews && searchResults && recipeResults) {
      previews.forEach(preview => {
        preview.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default anchor behavior
          searchResults.style.display = 'none'; // Hide search results
          recipeResults.style.display = 'block'; // Show recipe
        });
      });
    }
  }
});


const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  RecipeView.addHandlerUpload(controlAddRecipe);
  resultsView.addHandlerSortByDuration(controlSortByDuration);
  resultsView.addHandlerSortByIngredients(controlSortByIngredients);
  // resultsView.addHandlerVegetarianFilter(controlVegetarianFilter);
};
init();
