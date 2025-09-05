<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium">
      Welcome to Note.
    </p>
    <p>
      A <a
        href="https://nuxt.com"
        target="_blank"
        class="text-(--ui-primary)"
        rel="noopener"
      >Nuxt</a> App Hosted on <a
        href="https://pages.cloudflare.com"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >Cloudflare Pages</a> server-side rendering on the edge and using <NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >
        Cloudflare D1 database
      </NuxtLink>.
    </p>
    <p>
      Login, create or update your notes.
    </p>
    <USeparator />
    <p class="text-sm text-(--ui-text-muted) italic">
      Personal information is not stored in database only the notes created with your GitHub ID.
    </p>
  </div>
</template>
