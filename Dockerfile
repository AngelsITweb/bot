FROM node:19.3-buster as build
ARG UID=1000
ARG GID=1000
RUN userdel node
RUN groupadd --gid $GID user && \
    useradd --uid $UID --gid user --shell /bin/bash --create-home user
WORKDIR /app
RUN chown -R user:user /app
USER user

COPY --chown=user:user ./package.json ./package.json
RUN npm install

COPY --chown=user:user . .
CMD node index.js

FROM build as clearing
RUN rm -rf .env
