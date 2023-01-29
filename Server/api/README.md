# Api

## Routes

### Auth ``/api/v1/auth``

``/api/v1/auth/register`` :
- Create a new user in data base
- Method : POST
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


``/api/v1/auth/login`` :
- Register a user and return a jwt token
- Method : POST
- Body :
    ```json
    {
        "username": "exmaple",
        "password": "password"
    }
    ```
- Response :
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtYXRyIiwiZW1haWwiOiJtYXRyQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTMscD00JHNPZ25peGhDZHVNbG1VRHhJREJkSlEkSWVaUlVrYktsNUVmamRDdUdkc0JQVzNMY3c4eUgxdzhBRGJXTk9UZEx1OCIsImlhdCI6MTY3NDkyMTE5OSwiZXhwIjoxNjc0OTIyOTk5fQ.Q7_eUDfgch_9i356B4Tt59QhxGIk1hP5vg0YZH6IGpo"
    }
    ```
### Data ``/api/v1/data``

``/api/v1/data/:project/all`` :
- Retreive a list of captors data
- ex : ``/api/v1/data/IUT-BLAGNAC/all`` 
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
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

``/api/v1/data/:project/device/:device`` :
- Retreive a list of captors data from given deviceName
- ex : ``/api/v1/data/IUT-BLAGNAC/device/AM107-6``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
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

``/api/v1/data/:project/room/:room`` :
- Retreive a list of captors data from given project and room
- ex : ``/api/v1/data/IUT-BLAGNAC/room/B111``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
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

``/api/v1/data/:project/type/:co2`` :
- REtrieve a list of type data from given project
- ex : ``/api/v1/data/IUT-BLAGNAC/type/co2``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    [
    {
        "value": 426,
        "ts": "2023-01-28T20:24:10.660Z",
        "device": "AM107-31",
        "room": "E101"
    },
    {
        "value": 414,
        "ts": "2023-01-28T20:24:10.260Z",
        "device": "AM107-35",
        "room": "E105"
    },
    {
        "value": 437,
        "ts": "2023-01-28T20:24:10.079Z",
        "device": "AM107-8",
        "room": "B002"
    }]
    ```

### Battery ``/api/v1/battery``

``/api/v1/battery/:project/all`` :
- Retreive a list of captors battery
- ex : ``/api/v1/battery/IUT-BLAGNAC/all`` 
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    [
    {
        "id": 685,
        "deveui": "24e124128c011464",
        "ts": "2023-01-28T18:38:32.969Z",
        "battery": 100,
        "name": "AM107-39",
        "room_name": "E209",
        "project_name": "IUT-BLAGNAC"
    },
    {
        "id": 686,
        "deveui": "24e124128c016491",
        "ts": "2023-01-28T18:38:53.201Z",
        "battery": 100,
        "name": "AM107-50",
        "room_name": "hall-2",
        "project_name": "IUT-BLAGNAC"
    }]
    ```

``/api/v1/battery/:project/device/:device`` :
- Retreive a list of captors battery from given deviceName
- ex : ``/api/v1/battery/IUT-BLAGNAC/device/AM107-6``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    [{
        "id": 692,
        "deveui": "24e124128c011778",
        "ts": "2023-01-28T18:43:02.255Z",
        "battery": 42.91,
        "name": "AM107-6",
        "room_name": "B203",
        "project_name": "IUT-BLAGNAC"
    },
    {
        "id": 737,
        "deveui": "24e124128c011778",
        "ts": "2023-01-28T19:13:02.470Z",
        "battery": 42.91,
        "name": "AM107-6",
        "room_name": "B203",
        "project_name": "IUT-BLAGNAC"
    },
    {
        "id": 788,
        "deveui": "24e124128c011778",
        "ts": "2023-01-28T19:53:02.425Z",
        "battery": 42.91,
        "name": "AM107-6",
        "room_name": "B203",
        "project_name": "IUT-BLAGNAC"
    }]
    ```

``/api/v1/battery/:project/room/:room`` :
- Retreive a list of captors battery from given project and room
- ex : ``/api/v1/battery/IUT-BLAGNAC/room/B111``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    [{
        "id": 729,
        "deveui": "24e124128c011586",
        "ts": "2023-01-28T19:09:09.781Z",
        "battery": 42.91,
        "name": "AM107-3",
        "room_name": "B111",
        "project_name": "IUT-BLAGNAC"
    },
    {
        "id": 769,
        "deveui": "24e124128c011586",
        "ts": "2023-01-28T19:39:09.991Z",
        "battery": 44.88,
        "name": "AM107-3",
        "room_name": "B111",
        "project_name": "IUT-BLAGNAC"
    }]
    ``` 

### Project ``/api/v1/project``

``/api/v1/project/`` :
- Create a project and affect user to it
- Method : POST
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Body :
    ```json
    {
        "name": "test-hello"
    }
    ```
- Response :
    ```json
    {
        "message": "user has been successfully added to the project."
    }
    ```

``/api/v1/project/`` :
- Retrieve a list of user project
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    [
        {
            "id": 1,
            "name": "IUT-BLAGNAC",
            "username": "matr",
            "project_name": "IUT-BLAGNAC"
        },
        {
            "id": 3,
            "name": "hello",
            "username": "matr",
            "project_name": "hello"
        }
    ]
    ```

``/api/v1/project/:project`` :
- Delete a project
- Method : DELETE
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    {
        "message": "project has been successfully removed to the database."
    }
    ```

``/api/v1/project/addUser/:project/:username`` :
- Add a user to a project
- ex : ``/api/v1/project/addUser/IUT-BLAGNAC/ericp``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    {
        "message": "user has been successfully added to the project."
    }
    ```

``/api/v1/project/removeUser/:project/:username`` :
- Remove a user to a project
- ex : ``/api/v1/project/removeUser/IUT-BLAGNAC/ericp``
- Method : GET
- Headers :
    ```
        Authorization: Bearer <token>
    ```
- Response :
    ```json
    {
        "message": "user has been successfully removed to the project."
    }
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
- Headers :
    ```
        Authorization: Bearer <token>
    ```