$(function() {
    let categories = [], 
        cities = [], 
        events = [],
        regions = [];

        
    getCategories();
    getCities();
    getEvents();

    let app = new Vue({
        el : '#app',
        data: {
            categoriesFilter: 'Все категории',
            categories : categories,
            regionFilter: 'Все области',
            citiesFilter: 'Все города',
            regions: regions,
            events: events,
            cities: cities
        },
        computed: {
            // computedRegions,
            filteredCities,
            filteredEvents
        }
    });

    function getCategories() {
        $.ajax({
            url: '/getcategories',
            type: 'GET',
            success: function(resp) {
                categories.push({text : 'Все категории', value : 'Все категории'});
                for(let i = 0; i < resp.categories.length; i++) {
                    categories.push({text : resp.categories[i], value : resp.categories[i]});
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
    function getCities() {
        $.ajax({
            url: '/getCities',
            type: 'GET',
            success: function(resp) {
                regions.push({text : 'Все области', value : 'Все области'});
                for(let item in resp){
                    // console.log(item);
                    cities.push(new Region(item, resp[item]));
                    
                }
                // cities[0];
                console.log(cities[0]);
                for(let i = 0; i < cities.length; i++) {
                    regions.push({text : cities[i].name, value : cities[i].name});
                }

                
            },
            error: function(err) {
                console.log(err);
                
            }
        });
    }
    function getEvents() {
        $.ajax({
            url: '/getEvents',
            type: 'GET',
            success: function(resp) {
                for(let item in resp.events){
                    events.push(new RegionEvent(item, resp.events[item]));
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
    function filteredCities() {
        let citiesList = [];
        citiesList.push({text : 'Все города', value : 'Все города'});

        for(let i = 0; i < this.cities.length; i++) {
            if (this.regionFilter == 'Все области') {
                for(let j = 0; j < this.cities[i].cities.length; j++) {
                    citiesList.push({text : this.cities[i].cities[j], value : this.cities[i].cities[j]});
                }
            } else {
                if (this.cities[i].name == this.regionFilter) {
                    console.log(this.cities[i]);
                    for(let j = 0; j < this.cities[i].cities.length; j++) {
                        citiesList.push({text : this.cities[i].cities[j], value : this.cities[i].cities[j]});
                    }
                }
            }
        } 
        return citiesList;
    }
    function filteredEvents() {
        let results = this.events.filter(x => this.categoriesFilter == 'Все категории'? x : x.details['category'] == this.categoriesFilter)
                    .filter(y => this.regionFilter == 'Все области'? y : y.details['region'] == this.regionFilter)
                    .filter(z => this.citiesFilter == 'Все города'? z : z.details['city'] == this.citiesFilter)
                    .slice(0, 9);
        return results;
    }
//     function computedRegions() {
//         if(this.citiesFilter != 'Все города') {
//             // for(let i = 0; i < this.cities.length; i++) {
// console.log("we are in");
//             return {regionFilter: 'Все области'};
//             // }
//         }
//     }

});

class Region {
    constructor(_name, _cities) {
        this.name = _name;
        this.cities = _cities;
    }
}

class RegionEvent {
    constructor(_id, _details) {
        this.id = _id;
        this.details = _details;
    }
}