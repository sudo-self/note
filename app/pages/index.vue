<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium">
      Welcome to Note.
    </p>
    <p>
      A secure notes app built with <a
        href="https://nuxt.com"
        target="_blank"
        class="text-(--ui-primary)"
        rel="noopener"
      >Nuxt</a> hosted on <a
        href="https://pages.cloudflare.com"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >Cloudflare Pages</a> SSR on the edge featuring a serverless<NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >
        Cloudflare D1
      </NuxtLink>.
    </p>
    <p>
      Login, create & update secure notes.
    </p>
    <USeparator />
    <p class="text-sm text-(--ui-text-muted) italic">
      personal information is not stored in the database, only the notes created with your GitHub ID.
    </p>
  </div>
</template>
