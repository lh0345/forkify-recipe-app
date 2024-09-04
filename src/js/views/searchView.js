class SearchView{
    #parentEl = document.querySelector('.search');

    getQuery(){
        const query = this.#parentEl.querySelector('.search__field').value;
        return query;
    }
    
    addHandlerSearch(handler) {
        this.#parentEl.querySelector('.search__field').addEventListener('input', function (e) {
          e.preventDefault();
          handler();
        });
      }
    }
export default new SearchView();


    // addHandlerSearch(handler){
    //     this.#parentEl.addEventListener('submit', function (e){
    //     e.preventDefault();
    //     handler();
    //     })
    // }

