window.onload = function() {
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
  sendAjax(url).then(
    responseText => {
      responseText = JSON.parse(responseText);
      
      for (let key in responseText.teams) {
        if(responseText.teams[key].flag_country == "Италия") {
          responseText.teams[key].flag_country = "italy"
        }
      }
      
      show();
      function show() {
        let source = temp.innerHTML;
        let templateFn = Handlebars.compile(source);
        let template = templateFn({responseText: responseText.teams});
    
        results.innerHTML = template;
      }
    },
    () => {
      alert('Some error occurred');
    }
  )
}
