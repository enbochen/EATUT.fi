(function() {
    'use strict';
    
    moment.locale('fi');
    
    var arkisin = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'],
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        lang = 'en';

    
    var selectedDate = moment(new Date());
        
    var contentElem = document.getElementById('main-content'),
    
        source = document.getElementById('main-template').innerHTML,
        template = doT.template(source),
        loadingIcon = '<img class="enso" src="./img/enso.gif"/>',
        
        apiUrl = 'https://eatut-api.herokuapp.com/';
        
    updateMenus(selectedDate, lang);
    
    document.getElementById('next-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.add(1, 'day');
        
        updateMenus(selectedDate, lang);
    });
    
    document.getElementById('prev-day').addEventListener('click', function(event) {
        event.preventDefault();
        
        selectedDate.subtract(1, 'day');
        
        updateMenus(selectedDate, lang);
    });
    
    document.getElementById('lang-en').addEventListener('click', function(event) {
        event.preventDefault(); 
        
        lang = 'en';
        
        updateMenus(selectedDate,lang);
    });
    
    document.getElementById('lang-fi').addEventListener('click', function(event) {
        event.preventDefault();
        
        lang = 'fi';
                  
        updateMenus(selectedDate,lang);
    });
        
    
    function updateMenus(date, lang) {
        contentElem.innerHTML = loadingIcon;
        
        var dateString = date.format('YYYY-MM-DD'),
            requestUrl = apiUrl + dateString + '/' + lang;
            
        var req = new XMLHttpRequest();
        
        req.addEventListener('load', function() {
            var context = JSON.parse(this.responseText);
            context.date = (lang == 'en' ? weekdays[date.weekday()] : arkisin[date.weekday()] )+ ' ' + date.format('D.M.');
            
            contentElem.innerHTML = template(context);
        });
        
        req.open('get', requestUrl, true);
        req.send();
    }
})();