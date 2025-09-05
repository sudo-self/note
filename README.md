# Secure Notes app built with Nuxt served from the Edge


A demonstration using [Nuxt](https://nuxt.com) with server-side rendering on the edge, authentication and database querying using SQLite in production.

## Features

- [Server-Side Rendering on the Edge](https://nuxt.com/blog/nuxt-on-the-edge)
- Authentication backed-in using [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)
- Leverage SQLite as database with migrations using [drizzle ORM](https://orm.drizzle.team/)
- User interface made with [Nuxt UI](https://ui.nuxt.com)
- Embed [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview/) in the [Nuxt DevTools](https://devtools.nuxt.com)

## Live demos

- CloudFlare Pages + D1: https://nuxt-todos-edge.pages.dev
- CloudFlare Pages + Turso: https://nuxt-todos-turso.pages.dev
- Lagon.app + Turso: https://nuxt-todos.lagon.dev
- Vercel Edge + Turso: https://nuxt-todos-edge.vercel.app
- Netlify Edge + Turso: https://nuxt-todos-edge.netlify.app
- Deno Deploy + Turso: https://nuxt-todos-edge.deno.dev


## SQL

```
CREATE TABLE `todos` (
    `id` integer PRIMARY KEY NOT NULL,
    `user_id` integer NOT NULL,
    `title` text NOT NULL,
    `completed` integer DEFAULT 0 NOT NULL,
    `created_at` integer NOT NULL
);
```

Make sure to install the dependencies using [pnpm](https://pnpm.io/):

```bash
pnpm i
```

Create a [GitHub Oauth Application](https://github.com/settings/applications/new) with:

- Homepage url: `http://localhost:3000`
- Callback url: `http://localhost:3000/api/auth/github`

Add the variables in the `.env` file:

```bash
NUXT_OAUTH_GITHUB_CLIENT_ID="my-github-oauth-app-id"
NUXT_OAUTH_GITHUB_CLIENT_SECRET="my-github-oauth-app-secret"
```

To create sealed sessions, you also need to add `NUXT_SESSION_SECRET` in the `.env` with at least 32 characters:

```bash
NUXT_SESSION_SECRET=your-super-long-secret-for-session-encryption
```

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Deploy on CloudFlare Pages

Create a CF pages deployment linked to your GitHub repository. Make sure to select Version 2 (Beta) as the build system version.

### Environment variables

```bash
NUXT_OAUTH_GITHUB_CLIENT_ID=...
NUXT_OAUTH_GITHUB_CLIENT_SECRET=...
NUXT_SESSION_PASSWORD=...
```

### Build command

Set the build command to:

```bash
npm run build
```

And the output directory to `dist/`

### D1 Database

Lastly, in the project settings -> Functions, add the binding between your D1 database and the `DB` variable:

Copy the contents from `server/database/migrations/0000_heavy_xorn.sql` into the D1 console to seed the database.

### Turso Database

You can also use [Turso](https://turso.tech/) database instead of CloudFlare D1 by creating a database and adding the following env variables:

```
TURSO_DB_URL=...
TURSO_DB_TOKEN=...
```

## License

[MIT License](./LICENSE)
