window.onload = function() { //после загрузки 
  let url = 'js/seriea.json';
  
  function sendAjax(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      
      xhr.open('GET', url);
      xhr.addEventListener('load', () => {
        resolve(xhr.responseText);
      });
      xhr.addEventListener('error', () => {
        reject();
      });
      xhr.send();
    });
  }
  sendAjax(url).then( // начать разбор файла
    responseText => {
      responseText = JSON.parse(responseText);
      
      for (let key in responseText.teams) { // удобная нам сортировка
        if(responseText.teams[key].flag_country == "Италия") {
          responseText.teams[key].flag_country = "italy"
        }
      }
      
      show(responseText); // вывод результата
      function show(a) {
        let source = temp.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({responseText: responseText.teams});
    
        results.innerHTML = template;
      }
      
      var clone = {}; // клонируем выведенный исходник
      for (let key in responseText) {
        clone[key] = responseText[key];
      }
      
      let sort = document.querySelector('.sort'); // обработка сортировки

      sort.addEventListener('click', cb1);
      
      function cb1(e) {
          let currentID = e.target.getAttribute('id');
          filter(currentID);
      }
      
      
      function filter(currentID) {
        if(currentID != 'restart') {
          restoreObjValue();
          console.time('set2');
          for(let i = 0; i < responseText.teams.length-1; i++) {
            let max = 0;
            let maxO;
            let pos;
            for(var j = i; j < responseText.teams.length; j++) {
              if(max <= responseText.teams[j][currentID]) {max = responseText.teams[j][currentID]; maxO = responseText.teams[j]; pos = j};
            }
            responseText.teams.splice(i, 0, maxO);
            responseText.teams.splice(pos+1, 1);
          }
          console.timeEnd('set2');
          show(responseText);
        }else {
          for (let key in clone) {
          restoreObjValue();
          show(responseText);
          }
        }
      }
      
      
      
      function restoreObjValue() {
        for (let key in clone) {
          responseText[key] = clone[key];
        }
      }

    },
    () => {
      alert('Some error occurred');
    }
  )
}