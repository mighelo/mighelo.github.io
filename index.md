---
layout: home
author_profile: true
---

<main class="container">

  <h1>Appunti di viaggio</h1>
<p>Note, immagini e storie da posti diversi.</p>

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <p class="meta">{{ post.date | date: "%d %B %Y" }}</p>
      </li>
    {% endfor %}
  </ul>

</main>	