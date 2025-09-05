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
      >Cloudflare Pages.</a>&nbsp;App includes SSR from the edge and a serverless<NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        rel="noopener"
        class="text-(--ui-primary)"
      >
        Cloudflare D1.
      </NuxtLink>
    </p>
    <p>
      Create, Update, & Delete notes with Confidence.
    </p>
    <USeparator />
    <p class="text-sm text-(--ui-text-muted) italic">
    Personal info is not stored in the App. Only the notes you create with your GitHub ID.
    </p>
  </div>
</template>
