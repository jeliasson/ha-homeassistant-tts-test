# Home Assistant TTS Test using Amazon Polly
This is a testing tool for Home Assistant's TTS (Text-To-Speech) using Amazon Polly, and [jishi/node-sonos-http-api](https://github.com/jishi/node-sonos-http-api) for discovering Sonos speakers as entity_id's.


## Deployment
This repository is automatically published to [https://jeliasson-ha-homeassistant-tts-test](http://jeliasson-ha-homeassistant-tts-test.azurewebsites.net) on [Azure](https://azure.microsoft.com/en-us/services/app-service/web).

## Install
- Setup your Home Assistant configuration.yaml for Amazon Polly:
```yaml
tts:
  - platform: amazon_polly
    aws_access_key_id: 'your AWS key id'
    aws_secret_access_key: 'your AWS access key'
    region_name: 'eu-west-1'
    text_type: ssml
```
- (Install [jishi/node-sonos-http-api](https://github.com/jishi/node-sonos-http-api) for discovering Sonos speakers as entity_id's)
- Clone/fork this repo
- Publish/run ```index.html```. 

### Todo
* Add volume

## Contribute
Feel free!
