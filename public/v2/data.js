 var userChoice = 'denver'


las_vegas = 'Las Vegas';
los_angeles = 'Los Angeles';
new_york = 'New York';
san_fransisco = 'San Fransisco';

var zoneOnly = {
    atlanta: 'Atlanta',
    austin: 'Austin',
    boston: 'Boston',
    chicago: 'Chicago',
    dallas: 'Dallas',
    detroit: 'Detroit',
    denver: 'Denver',
    houston: 'Houston',
    Miami: 'Miami',
    las_vegas: 'Las Vegas',
    los_angeles: 'Los Angeles',
    new_york: 'New York',
    san_fransisco: 'San Fransisco'
}

var popularTrips = {
    austin: ['Las Vegas', 'San Fransisco', 'Denver'],
    atlanta: ['Chicago', 'New York', 'Denver'],
    chicago: ['Las Vegas','Los Angeles','Phoenix'],
    dallas: ['New York', 'Los Angeles', 'Denver'],
    detroit: ['New York', 'Los Angeles', 'Denver'],
    denver: ['Los Angeles', 'Las Vegas', 'Austin'],
    houston: ['Orlando', 'Atlanta'],
    miami: ['Philadelphia', 'Atlanta', 'Las Vegas'],
    las_vegas: ['Denver', 'Austin', 'Los Angeles'],
    los_angeles: ['Austin', 'Las Vegas', 'San Fransisco'],
    new_york: ['Austin', 'Chicago', 'San Fransisco'],
    san_fransisco: ['Denver', 'Las Vegas','Orlando']
}

var hotDestinations = {
    austin: ['New Orleans', 'Orlando', 'San Diego'],
    atlanta: ['New Orleans', 'Orlando', 'Los Angeles'],
    chicago: ['Orlando', 'Phoenix', 'Houston'],
    dallas: ['Phoenix', 'Orlando'],
    detroit: ['Los Angeles', 'Orlando', 'Las Vegas'],
    denver: ['New Orleans', 'Orlando', 'Austin'],
    houston: ['Los Angeles', 'Phoenix'],
    miami: ['Las Vegas', 'Orlando'],
    las_vegas: ['Los Angeles', 'New Orleans', 'Phoenix'],
    los_angeles: ['Las Vegas', 'New Orleans', 'Orlando'],
    new_york: ['Los Angeles', 'Orlando', 'Las Vegas'],
    san_fransisco: ['Phoenix', 'San Diego', 'Las Vegas']
}

var winterWeather = {
    austin: ['Denver', 'Salt Lake City', 'Chicago'],
    atlanta: ['Denver', 'Salt Lake City', 'Chicago'],
    chicago: ['Denver', 'Salt Lake City'],
    dallas: ['Denver', 'Salt Lake City'],
    detroit: ['Denver', 'Salt Lake City'],
    denver: ['Salt Lake City', 'Chicago'],
    houston: ['Denver'],
    las_vegas: ['Denver', 'Salt Lake City', 'Chicago'],
    los_angeles: ['Denver', 'Salt Lake City', 'Chicago'],
    new_york: ['Denver', 'Salt Lake City'],
    san_fransisco: ['Denver', 'Salt Lake City'],
}

var zone = {
    "atlanta": [
        "Austin",
        "Chicago",
        "Dallas",
        "Denver",
        "Detroit",
        "Houston",
        "Las Vegas",
        "Los Angeles",
        "Minneapolis",
        "New Orleans",
        "New York",
        "Orlando",
        "Philadelphia",
        "Salt Lake City",
        "San Fransisco"
    ],
    "austin": [
        "Atlanta",
        "Chicago",
        "Charlotte",
        "Dallas",
        "Denver",
        "Detroit",
        "Indianapolis",
        "Las Vegas",
        "Los Angeles",
        "Milwaukee",
        "Minneapolis",
        "New Orleans",
        "New York",
        "Orlando",
        "Philadelphia",
        "Salt Lake City",
        "San Diego",
        "Seattle"
    ],
    "boston": [
        "Atlanta",
        "Chicago",
        "Charlotte",
        "Dallas",
        "Denver",
        "Detroit",
        "Indianapolis",
        "Las Vegas",
        "Los Angeles",
        "Milwaukee",
        "Minneapolis",
        "New Orleans",
        "New York",
        "Orlando",
        "Philadelphia",
        "Salt Lake City",
        "San Diego",
        "Seattle"
    ],
    "chicago": [
      "Atlanta",
      "Charlotte",
      "Dallas",
      "Denver",
      "Detroit",
      "Houston",
      "Las Vegas",
      "Los Angeles",
      "New York",
      "Orlando",
      "Phoenix",
      "San Diego",
    ],
    "dallas": [
      "Atlanta",
      "Austin",
      "Chicago",
      "Denver",
      "Houston",
      "Los Angeles",
      "New York",
      "Oklahoma City",
      "Orlando",
      "Philadelphia",
      "Phoenix",
      "San Fransisco",
    ],
    "detroit": [
        "Atlanta",
        "Austin",
        "Chicago",
        "Dallas",
        "Las Vegas",
        "Los Angeles",
        "New York",
        "Orlando",
        "Philadelphia",
        "Phoenix",
        "Salt Lake City",
        "San Fransisco",
    ],
    "denver": [
        "Atlanta",
        "Austin",
        "Chicago",
        "Charlotte",
        "Dallas",
        "Detroit",
        "Houston",
        "Kansas City",
        "Las Vegas",
        "Los Angeles",
        "Minneapolis",
        "New Orleans",
        "New York",
        "Oklahoma City",
        "Orlando",
        "Philadelphia",
        "Phoenix",
        "Salt Lake City",
        "San Antonio",
        "San Diego",
        "San Fransisco",
        "Seattle"
    ],
    "houston": [
        "Atlanta",
        "Chicago",
        "Denver",
        "Detroit",
        "Las Vegas",
        "Los Angeles",
        "Orlando",
        "Phoenix",
    ],
    "miami": [
        "Atlanta",
        "Chicago",
        "Dallas",
        "Denver",
        "Detroit",
        "Houston",
        "Las Vegas",
        "Los Angeles",
        "New York",
        "Orlando",
        "Philadelphia",
    ],
    "las_vegas": [
        "Atlanta",
        "Chicago",
        "Dallas",
        "Denver",
        "Houston",
        "Los Angeles",
        "New Orleans",
        "New York",
        "Philadelphia",
        "Phoenix",
        "Salt Lake City",
        "San Diego",
        "San Fransisco",
        "Seattle"
    ],
    "los_angeles": [
        "Atlanta",
        "Austin",
        "Chicago",
        "Dallas",
        "Denver",
        "Houston",
        "Las Vegas",
        "New Orleans",
        "New York",
        "Orlando",
        "Philadelphia",
        "Washington DC",
        "Phoenix",
        "Salt Lake City",
        "San Fransisco",
        "Seattle"
    ],
    "new_york": [
      "Atlanta",
      "Albuquerque"
      "Austin",
      "Chicago",
      "Dallas",
      "Denver",
      "Houston",
      "Las Vegas",
      "Los Angeles",
      "Miami",
      "New Orleans",
      "Orlando",
      "Philadelphia",
      "Phoenix",
    ],
    "san_fransisco": [
        "Atlanta",
        "Austin",
        "Chicago",
        "Dallas",
        "Denver",
        "Houston",
        "Las Vegas",
        "Los Angeles",
        "Miami",
        "New Orleans",
        "Orlando",
        "Philadelphia",
        "Phoenix",
    ],
};

 $(window).on('load', function() {

    data = '<option value="">Select Departure</option>';
    $('.one-way-booking #departure').append(data);
    $('.two-way-booking #departure').append(data);

    for (x in zoneOnly) {

        //data = '<option value="'+x+'">'+zoneOnly[x]+'</option>';
      //  $('#departure').append(data);
      //  $('#arrival').append(data);

    }

    $('.one-way-booking #departure').change(function() {
       for(x in zone) {

        if(zone[x] == $('#departure').val()) {

            for(var i = 0; i < x.zone[x].length ; i++) {
                data = '<option value="'+zone[x][i]+'">'+zone[x][i]+'</option>';

            }


        }
       }
    });

    $('.two-way-booking #departure').change(function() {
        for(x in zone) {

         if(zone[x] == $('#departure').val()) {

             for(var i = 0; i < x.zone[x].length ; i++) {
                 data = '<option value="'+zone[x][i]+'">'+zone[x][i]+'</option>';

             }


         }
        }
     });

});
