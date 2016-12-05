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
      
      let win = document.querySelector('#win'); // обработка сортировки
      let draw = document.querySelector('#draw'); // обработка сортировки
      win.addEventListener('click', cb1);
      draw.addEventListener('click', cb2);

      
      function cb1(e) {
          let currentID = e.target.getAttribute('id');
          filter(currentID);
      }
      
      function cb2(e) {
          let currentID = e.target.getAttribute('id');
          filter(currentID);
      }
      
      function filter(currentID) {
        if(currentID != 'restart') {
          restoreObjValue();
          console.time('set2');
          for(let i = 0; i < responseText.teams.length-1;) {
              if(responseText.teams[i][currentID] < responseText.teams[i+1][currentID]) {
                responseText.teams.splice(i, 0, responseText.teams[i+1]);
                responseText.teams.splice(i+2, 1);
                i = 0;
              }else {
                ++i;
              }
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
// SOME error hides here
    },
    () => {
      alert('Some error occurred');
    }
  )
}
