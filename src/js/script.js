
const elements = {
    citiesListEl: document.querySelector('.cities__list'),
    citiesContainer: document.querySelector('.cities'),
    eventsListEl: document.querySelector('.events')
}

// spining loader
var renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

/**
 *  CITIES CONTROLER
 */
function getCities() {
   
    const urlProxy = `https://cors-anywhere.herokuapp.com/`;
    const urlCities = 'https://api.meetup.com/2/cities?&sign=true&photo-host=public&country=rs&page=40';
                 
    fetch(`${urlProxy}${urlCities}`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        renderCityResults(data.results);
    })
    .catch(error => {  
        console.log(error)
    });
}

renderLoader(elements.citiesContainer);
getCities();

// Render list of cities in left panel
function renderCityResults(cities){
    var loader = document.querySelector('.loader');
    if(loader){
        elements.citiesContainer.removeChild(loader);
    }  
    cities.forEach(element => {
        let markup = `<li><a class="cities__link" href="#lat=${element.lat}&lon=${element.lon}">${element.city}</a></li>`;
        elements.citiesListEl.insertAdjacentHTML('beforeend', markup);
    });
}


/**
*  EVENT CONTROLER
*/
const controlEvents = async () => {
    // Get location from url
    const str = window.location.hash.replace('#', '');

    if(location){
        await getEvents(location);
    }
};

// Event listener for hash changes
window.addEventListener('hashchange', controlEvents);

// Get list of events for chosen city
function getEvents(loc){
    // get latitude and longitude for selected city
    const location = window.location.hash.replace('#', '');
    const position1 = location.indexOf("=");
    const position2 = location.indexOf("&");
    const lat = location.slice(position1+1, position2);
    const lon = location.slice(position2+5);

    const urlEvents = `https://api.meetup.com/find/upcoming_events?photo-host=public&sig_id=215516831&radius=20&lon=${lon}&lat=${lat}&sig=03cd11dcac4f0123bd85f710c8d1d0e5e3385ac0`;
    const urlProxy = 'https://cors-anywhere.herokuapp.com/';

    elements.eventsListEl.innerHTML= "";
    renderLoader(elements.eventsListEl);
   
    fetch(`${urlProxy}${urlEvents}`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        renderEventsResults(data);
    })
    .catch(error => {   
        console.log(error)
    });
}

// Render list of events in right panel
function renderEventsResults(eventsObj){
    var events = eventsObj.events;
    elements.eventsListEl.innerHTML= "";

    if(events.length !== 0){
      events.forEach((el) =>{
        
        let description = "";
        if(el.description){
            description = el.description;
            description = description.replace(/<img .*?>/g,"FOTOGRAFIJA");
            if(description.length > 400){
               description = description.substring(0, 400);
               description = `${description} ... [opširnije]`
            }
        }        
    
        const markup = ` <div class="event">
            <h3 class="event__title">${el.name}</h3>
            <span class="event__location">${el.group.localized_location};</span>
            <span class="event__date">${el.local_date};</span>
            <span class="event__time">${el.local_time}h</span>
            ${description}
        </div>`;

        elements.eventsListEl.insertAdjacentHTML('beforeend', markup);
    });
      
    }else{
      const markup=`<h3>Za izabran grad trenutno ne postoji nijedan unos.</h3>`
      elements.eventsListEl.insertAdjacentHTML('beforeend', markup);
    }

}






