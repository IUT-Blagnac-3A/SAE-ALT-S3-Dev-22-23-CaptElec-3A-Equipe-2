# SAE ALTERNANT DEV 2022/2023 CAPTELEC 3A EQUIPE 2

# Wiki

You can find the project wiki with all the documentation [here](https://github.com/IUT-Blagnac-3A/SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2/wiki)

# Introduction

<img width="75" height="75" style="float: left; margin: 0 10px 0 0; border-radius:10px" alt="Discord" src="https://cdn.discordapp.com/attachments/579303130886569984/1065183148473843742/1519871482152.png">

This project is a simple web application in the context of the SAE at the IUT of Blagnac. The website allows you to import svg maps and add sensors to work with them. (C02, temperature, humidity, etc.)

---

# Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Agile Methodology](#agile-methodology)
- [Team](#team)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation-steps)
  - [Configuration](#configuration)
  - [Run](#run)
- [Documentation](#documentation)
- [License](#license)

# Agile Methodology

We use the **Scrum methodology** to manage our project.

**You can find the Scrum board (Product Backlog)** [here](https://github.com/orgs/IUT-Blagnac-3A/projects/1/views/8)

<img src="https://cdn.discordapp.com/attachments/579303130886569984/1065181858867982367/image.png" style="border-radius:20px">

---

_We had two sprints of 1 week each. The first sprint was used to create the project and the second sprint was used to implement the features._

---

**First Release:** [here](https://github.com/IUT-Blagnac-3A/SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2/releases/tag/v0.1.0-alpha)

**Refinement Sprint 1:** [here](https://github.com/orgs/IUT-Blagnac-3A/projects/1/views/1)

**Backlog for the first sprint:** [here](https://github.com/orgs/IUT-Blagnac-3A/projects/1/views/1?filterQuery=+-status%3A%22%F0%9F%93%8B+Backlog%22%2C%22%F0%9F%86%95+New%22%2CReady%2C%22User+Stories%22)

<img src="https://media.discordapp.net/attachments/579303130886569984/1065182122446422096/image.png?width=1360&height=660" style="border-radius:20px">

---

**Second Release:** [here](https://github.com/IUT-Blagnac-3A/SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2/releases/tag/v1.1.0)

**Refinement Sprint 2:** [here](https://www.fichier-pdf.fr/2023/01/29/raffinementsprint2/preview/page/1/)

**Backlog for the second sprint:** [here](https://github.com/orgs/IUT-Blagnac-3A/projects/1/views/9)

<img src="https://media.discordapp.net/attachments/579303130886569984/1069247481436700742/image.png?width=925&height=671" style="border-radius:20px">

# Team

- [Eric PHILIPPE](https://github.com/Eric-Philippe) **(Scrum Master)**
- [Tony Nguyen](https://github.com/Tamachiii) **(Project Owner)**
- [Matthieu ROBERT](https://github.com/matthieurobert) **(Sys Admin)**
- [Léonidas Kosmidis](https://github.com/Leo0K) **(WebMaster)**
- [Mathis Merckel](https://github.com/CashMTS) **(WebMaster)**

# Installation

## Prerequisites

In order to run this project, you must have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

<img src="https://skillicons.dev/icons?i=docker" width="35x" />

## Installation Steps

Clone the repository:

```bash
git clone https://github.com/IUT-Blagnac-3A/SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2.git
```

The following command will create a folder named `SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2` containing the project.

```bash
cd infra
docker compose up -d --build
```

That command will build the docker images and run the containers without having to install anything on your machine.

## Configuration

The project is configured using environment variables. You can find the list of available variables in the `.env.example` file.

## Run

The project is now running on `http://localhost`.

[Click here for the direct link](http://localhost)

# Documentation

## Frontend

The frontend is an Angular application. You can find the documentation [here](https://angular.io/docs)

### Why Angular?

<img src="https://skillicons.dev/icons?i=angular" width="35x" />

Angular is a framework that allows you to create web applications using TypeScript. It is a framework that is very popular in the industry and is used by many companies. It is also a framework that is very well documented and has a large community. It is also a framework that is very easy to learn and that allows you to create very powerful applications.

---

## Backend

<img src="https://skillicons.dev/icons?i=nodejs,ts" width="65px" />

The backend is a NodeJS written in TypeScript. You can find the documentation [here](https://nodejs.org/en/docs/)

### Why NodeJS?

NodeJS is a JavaScript runtime environment that allows you to run JavaScript code outside of a browser. It is a very powerful tool that allows you to create web applications, desktop applications, mobile applications, etc. With a short deadline, it is a quick choice for us to be able to implement a server quickly.

---

## Database

<img src="https://skillicons.dev/icons?i=postgresql" width="46px" />

The database is a PostgreSQL database. You can find the documentation [here](https://www.postgresql.org/docs/)

### Why PostgreSQL?

PostgreSQL is a relational database management system. It is a very powerful tool that allows you to store data in a structured way.

---
