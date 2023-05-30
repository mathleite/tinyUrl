FROM node:19-slim as dev
RUN apt update && apt upgrade -y \
    && apt install -y git \
    # Pnpm package manager installment
    && npm install -g pnpm \
    && apt clean

USER node