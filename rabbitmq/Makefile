COMPOSE_FILE=docker-compose.yaml

up:
	docker compose -f $(COMPOSE_FILE) up -d --force-recreate --remove-orphans

down:
	docker compose -f ${COMPOSE_FILE} down