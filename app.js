
new Vue({
    el: '#app',
    data: {
        result: null,
        message: '<speak>\n\tHello, it\'s me <break time=".3s" /> Amazon Polly.\n\t<break time=".5s" />\n\tThe time is now {{ (states("sensor.time")) }}.\n</speak>',
        hostport: '10.10.10.10:8123',
        api_password: '',
        entity_ids: ['media_player.kitchen', 'media_player.living_room', 'media_player.bedroom'],
        entity_selected: []
    },
    methods: {
        magic: function () {
            var self = this;

            $.ajax({
                type: "POST",
                url: 'http://' + self.hostport + '/api/services/tts/amazon_polly_say?api_password=' + self.api_password,
                data: JSON.stringify({
                    entity_id: self.entity_ids,
                    message: self.message
                }),
                success: function(response) {
                    self.result = response;
                },
                error: function (err) {
                    self.result = err;
                }
            });
        }
    }
});
