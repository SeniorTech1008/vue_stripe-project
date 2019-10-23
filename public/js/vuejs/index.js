var app = new Vue({
        el: '#app',
        data: {
            search: {
                fly_from: '',
                fly_to: '',
                dateFrom: null,
                dateTo: null,
                apikey: "xklKtpJ5fxZnk4rsDepqOzLUaYYAO9dI"
            }
        },
        methods: {
            searchFlight: function() {
                let final_date = $('input[name="datefilterstart"]').val();
                let final_date_r = $('input[name="datefilterend"]').val();
                let departure = $('select[name="departure"]').val();
                let arrival = $('#arrival').val();

                app.search.fly_from = departure;
                app.search.fly_to = arrival;
                app.search.dateFrom = this.formatDate(final_date);
                app.search.dateTo = this.formatDate(final_date_r);

                let params = new URLSearchParams();
                params.append('fly_from', app.search.fly_from);
                params.append('fly_to', app.search.fly_to);
                params.append('dateFrom', app.search.dateFrom);
                params.append('dateTo', app.search.dateTo);
                params.append('apikey', app.search.apikey);
                console.log(params.toString());
                axios.get('https://kiwicom-prod.apigee.net/v2/search?' + params.toString())
                    .then(function(response) {
                        sessionStorage.setItem("flightSearchResult", JSON.stringify(response.data.data));
                        window.location = "results.html";
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            },
            formatDate: function(formDate) {
                let date = new Date(formDate);
                return date.getDate() + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
            }
        },
        beforeMount() {}
    })
    // iata key eb5d3f2e-eeda-4544-b517-c338ece6db8c