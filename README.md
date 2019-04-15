# CinemaApp Client

## Run application locally (dev mode)

> Application uses [The Movie DB API](https://www.themoviedb.org/documentation/api) as the source for the movies. Use this API to add movies you want to your custom API service (using admin panel). For this you'll need to create an account on [The Movie DB](https://www.themoviedb.org/) and provide credentials listed below.

1. Run `npm install` to install dependencies

2. Add `.env.development` file into project root directory with the following lines.

```
THE_MOVIE_DB_MOVIES_LIST_URI=<ALL_THIRD_PARTY_APU_MOVIES_LIST_URI>
THE_MOVIE_DB_API_KEY=<DEVELOPER_API_KEY>
THE_MOVIE_DB_API_READ_ACCESS_TOKEN=<DEVELOPER_API_READ_ACCESS_TOKEN>
API_ROOT_PATH=<YOUR_CUSTOM_API_SERVICE_ROOT_PATH>
```

3. Run `npm start`.

4. CONGRATS! Application should be running on `localhost:3000`.
