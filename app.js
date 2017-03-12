
var vm = new Vue({
    el: '#app',
    data: {
        result: null,
        message: '<speak>\n\tHello, it\'s me <break time=".3s" /> Amazon Polly.\n\t<break time=".5s" />\n\tThe time is now {{ (states("sensor.time")) }}.\n</speak>',
        host: '10.10.10.10',
        port: 8123,
        api_password: '',
        entity_ids: [],
        entity_selected: [],

        // Discover Sonos speakers using jishi/node-sonos-http-api (https://github.com/jishi/node-sonos-http-api)
        sonos_discovery: true,
        sonos_host: null, // null defaults to data.host
        sonos_port: 5005
    },
    methods: {
        magic: function () {
            var self = this;

            $.ajax({
                type: "POST",
                url: 'http://' + self.host + ':' + self.port + '/api/services/tts/amazon_polly_say?api_password=' + self.api_password,
                data: JSON.stringify({
                    entity_id: self.entity_selected,
                    message: self.message
                }),
                success: function(response) {
                    self.result = response;
                },
                error: function (err) {
                    self.result = err;
                }
            });
        },
        run_sonos_discovery: function() {
            var self = this;

            $.ajax({
                type: "GET",
                url: 'http://' + ((self.sonos_host === null) ? self.host : self.snos_host) + ':' + self.sonos_port + '/zones',
                success: function(response) {
                    $.each(response, function(id, zone) {
                        // Get room name as entity_id
                        var entity_id = zone.coordinator.roomName;

                        // @todo: Make this object translation based on it's actual specifications.
                        entity_id = entity_id.replace(' ', '_');
                        entity_id = entity_id.toLowerCase();

                        // Add domain prefix
                        entity_id = 'media_player.' + entity_id;

                        // Push entity to array entity_ids
                        self.entity_ids.push(entity_id);
                    });
                },
                error: function (err) {
                    //self.result = err;
                }
            });
        }
    }
});

// Sonos Discovery
if (vm.sonos_discovery === true)
    vm.run_sonos_discovery();
