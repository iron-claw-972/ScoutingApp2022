FROM python:3.10.1-bullseye as base

# Set backend location in container
WORKDIR /app/backend/

# Don't generate .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# Don't fill terminal buffer with text
ENV PYTHONUNBUFFERED 1
# Always use UTF-8
ENV PYTHONIOENCODING utf8

# Install PostgreSQL
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends \
      apt-transport-https \
      build-essential \
      ca-certificates \
      curl \
      gnupg2 \
      netcat \
      postgresql-client \
  && apt-get autoremove \
  && rm -rf /var/lib/apt/lists/*

RUN pip install pipenv

COPY Pipfile Pipfile.lock /app/backend/

EXPOSE 8000/tcp


FROM base as prod

RUN pipenv install --system --deploy --ignore-pipfile

# Copy backend files into container
COPY . /app/backend/

ENTRYPOINT [ "/bin/bash", "/app/backend/entrypoint.sh" ]


FROM base as dev

RUN pipenv install --system --deploy --ignore-pipfile --dev

# Copy backend files into container
COPY . /app/backend/

ENTRYPOINT [ "/bin/bash", "/app/backend/entrypoint.sh" ]