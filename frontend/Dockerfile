FROM node:16.11.1-buster as base

# Set location of frontend in container
WORKDIR /app/frontend/

# Don't collect telemetry data
ENV NEXT_TELEMETRY_DISABLED 1

# Install some basic Linux programs for QoL
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends \
      apt-transport-https \
      build-essential \
      ca-certificates \
      curl \
      gnupg2 \
      netcat \
  && apt-get autoremove \
  && rm -rf /var/lib/apt/lists/*

# Install Node packages
COPY package.json package-lock.json /app/frontend/

EXPOSE 3000/tcp


FROM base as prod

# Copy frontend files into container
COPY . /app/frontend/

ENTRYPOINT [ "/bin/bash", "/app/frontend/entrypoint.sh" ]


FROM base as dev

# Copy frontend files into container
COPY . /app/frontend/

ENTRYPOINT [ "/bin/bash", "/app/frontend/entrypoint.sh" ]