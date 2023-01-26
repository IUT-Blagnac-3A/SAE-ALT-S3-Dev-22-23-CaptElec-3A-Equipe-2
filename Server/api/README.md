# Api

## Routes

### Auth ``/api/auth``

``/register`` :
- Create a new user in data base
- Body :
    ```json
    {
        "username": "exmaple",
        "email": "example@example.com",
        "password": "password"
    }
    ```
- Response :
    ```
    {
        "message": "User created"
    }
    ```


``/login`` :
- Register a user and return a jwt token
- Body :
    ```json
    {
        "username": "exmaple",
        "password": "password"
    }
    ```
- Response :
    ```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJsb2xvIiwiZW1haWwiOiJsb2xvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTMscD00JHpldXJaT3NUbHZPSzZZUW1LZ01Fa1Ekdmp2NlMyTEplZC81SjRueTVsb1c0S0dOeFlCQVgySzA4dmlKc01nMmJ1VSIsImlhdCI6MTY3NDIyNzY5MiwiZXhwIjoxNjc0MjI5NDkyfQ.eh8WeXedZo5ibFtGbIMvRnGTo0kYlqKEpsCgI2BufLE
    ```
### Data ``/api/data``

``/`` :
- Retreive a list of captors data 
- Response :
    ```json
    [{
        "devicename": "AM107-37",
        "projet": "IUT-BLAGNAC",
        "room": "E100",
        "ts": "2023-01-20T14:35:10.455Z",
        "activity": 0,
        "co2": 679,
        "humidity": 27.5,
        "pressure": 997.7,
        "temperature": 22.7
    },
    {
        "devicename": "AM107-36",
        "projet": "IUT-BLAGNAC",
        "room": "E106",
        "ts": "2023-01-20T14:35:10.856Z",
        "activity": 11,
        "co2": 742,
        "humidity": 33,
        "pressure": 997.6,
        "temperature": 19.3
    },
    {
        "devicename": "AM107-11",
        "projet": "IUT-BLAGNAC",
        "room": "B102",
        "ts": "2023-01-20T14:35:14.984Z",
        "activity": 48,
        "co2": 1569,
        "humidity": 34.5,
        "pressure": 997.2,
        "temperature": 24
    }]
    ```

``/:deviceName`` :
- Retreive a list of captors data from given deviceName
- ex : ``/api/data/AM107-6``
- Response :
    ```json
    [{
        "devicename": "AM107-6",
        "projet": "IUT-BLAGNAC",
        "room": "B111",
        "ts": "2023-01-20T14:42:56.859Z",
        "activity": 0,
        "co2": 1021,
        "humidity": 36,
        "pressure": 997.1,
        "temperature": 20.3
    },
    {
        "devicename": "AM107-6",
        "projet": "IUT-BLAGNAC",
        "room": "B111",
        "ts": "2023-01-20T14:52:57.379Z",
        "activity": 0,
        "co2": 1024,
        "humidity": 36,
        "pressure": 997.2,
        "temperature": 20.3
    }]
    ```

``/:project/:room`` :
- Retreive a list of captors data from given project and room
- ex : ``/api/data/IUT-BLAGNAC/B111``
- Response :
    ```json
    [{
        "devicename": "AM107-6",
        "projet": "IUT-BLAGNAC",
        "room": "B111",
        "ts": "2023-01-20T14:42:56.859Z",
        "activity": 0,
        "co2": 1021,
        "humidity": 36,
        "pressure": 997.1,
        "temperature": 20.3
    },
    {
        "devicename": "AM107-6",
        "projet": "IUT-BLAGNAC",
        "room": "B111",
        "ts": "2023-01-20T14:52:57.379Z",
        "activity": 0,
        "co2": 1024,
        "humidity": 36,
        "pressure": 997.2,
        "temperature": 20.3
    }]
    ```


### Comment utiliser l'authentification

#### 1) Créer un utilisateur 

Requête : ``http://localhost:3000/api/auth/register``

Body :
```json
    {
        "username": "exmaple",
        "email": "example@example.com",
        "password": "password"
    }
```

Response :
```json
{
    "message": "User created"
}
```

#### 2) Se connecter

Requête : ``http://localhost:3000/api/auth/login``

Body :
```json
    {
        "username": "exmaple",
        "password": "password"
    }
```

Response :
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJsb2xvIiwiZW1haWwiOiJsb2xvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTMscD00JCtrN0lRZCtBVk1FMGlYU2FZNEE5cmckODNVdFE3Y2R6eDhJazRQdnJtanM1b3BYLytyaDdFKzR5VkRoVzhiUTNHMCIsImlhdCI6MTY3NDQ2NTgyMCwiZXhwIjoxNjc0NDY3NjIwfQ.YdvSgBUCV_0ZmwU_poVakj1FB9segEj_IW6VDaPYKNc"
}
```

Stocker le token pour pouvoir le réutiliser plus tard

#### 3) Faire une requête vers une route protégé

Requête : ``http://localhost:3000/apit/auth/protected``

Mettre le token dans le header Authorization Bearer token
