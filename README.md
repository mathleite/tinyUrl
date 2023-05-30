# TinyUrl
Shortener Url service is an application that receive a link and return a
_hashed_ endpoint that you can call and get access to the original link, like:
```text
given -> https://www.xpto.com/some_endpoint
return -> localhost:8080/a9dfa92a3e
           |-> redirects to the given endpoint
```
___
<div style="margin-left: auto; margin-right: auto; width: 40%">

| Technologies |
|:------------:|
|  Typescript  |
|    Redis     |
|     Jest     |
</div>



## Setup
### Docker
Run the following command to install the application packages
and start _tinyUrl_ service:
```shell
~$ docker-compose up --build
```

### Health-Check
You can check the application health:
```shell
curl --location 'localhost:8080/health-check'
```

## Usage
### Create a TinyUrl
Request: cURL
````shell
curl --location 'localhost:8080/shorten' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://www.google.com.br"
}'
````
Receive: Json
```json
{
    "newUrl": "localhost:8080/a9dfa92a3e"
}
```
### Access TinyUrl
>Here you will receive a redirect to the original link.

Request: cURL
```shell
curl --location 'localhost:8080/a9dfa92a3e'
```
### [WIP] Tests ~