# Iron Claw Scouting App for 2022 (Water Game)

Project board: https://github.com/iron-claw-972/ScoutingApp2022/projects/2

## Tools
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/) or [Github Desktop](https://desktop.github.com/)

## Setup
1. Download [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
2. Clone this repository
3. Open Powershell or Command Prompt or Terminal or some equivalent program
4. Navigate to the root of the repository using `cd <location of repository>`
5. Copy `.env.example` to `.env`
6. Change the values in `.env` as needed

## Running

### Development
```bash
docker-compose -f "docker-compose.dev.yml" up -d --build
```

### Production
```bash
docker-compose -f "docker-compose.prod.yml" up -d --build
```

## Useful Commands

### View logs
```bash
docker-compose -f 'docker-compose.dev.yml' -p 'ScoutingApp2022' logs -f
```