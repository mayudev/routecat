FROM node:alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter server build
RUN pnpm deploy --filter=server --prod /prod/server
RUN rm -r /prod/server/src
RUN mv /usr/src/app/packages/server/dist /prod/server/

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 8080
CMD ["pnpm", "start"]