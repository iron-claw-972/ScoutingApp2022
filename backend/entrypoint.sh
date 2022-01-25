#!/bin/bash

counter=1
while ! nc -z "db" "5432" > /dev/null 2>&1; do
    sleep 1
    counter=$((counter + 1))
    if [ $((counter % 20)) -eq 0 ]; then
        nc -z "db" "5432" >&2 echo "Waiting for MySQL (Count: $counter)."
    fi;
done

if [ -n "$ENV" ] && [ "$ENV" == "prod" ]; then
    python manage.py migrate
    python manage.py collectstatic --no-input
    python manage.py createsuperuser --no-input
    gunicorn config.wsgi:application --bind 0.0.0.0:8000
else
    python manage.py flush --no-input
    python manage.py reset_db --noinput
    echo "Deleted database"
    find . -path "**/__pycache__" -exec rm -r "{}" \;
    echo "Deleted __pycache__ directories"
    find . -path "**/migrations/*.py" -not -name "__init__.py" -delete
    echo "Deleted migrations directories"
    python manage.py makemigrations --no-input
    python manage.py migrate
    python manage.py collectstatic --no-input
    python manage.py createsuperuser --no-input
    python manage.py runserver 0.0.0.0:8000
fi