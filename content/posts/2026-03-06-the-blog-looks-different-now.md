+++
date = '2026-03-06'
draft = false
title = 'The blog looks different now'
categories = ['persona']
tags = ['blog']
usekatex = true
+++

It's 2026, and my interest in writing was at a new all-time low. Naturally, instead of actually writing, I did what any self-respecting developer does: I spent a week migrating the entire blog from the venerable Jekyll to Hugo. Does this count as ~~programming~~ sophisticated procrastination?

This isn't exactly a spectacular feat. A lot of people are jumping ship nowadays, usually for reasons related to the fragility of the Ruby ecosystem rather than Jekyll's actual capabilities (which are perfectly fine for most humans). All in all, I like Hugo more. I won't miss the cryptic failed builds I had to endure while deploying to Netlify.

My first instinct was to build everything from scratch. Then I realized that my definition of "scratch" is actually the [Bear Blog](https://bearblog.dev/) theme. It’s minimalistic enough to let me pretend I did the work while saving me from the existential dread of CSS grids.

Once the foundation was set, I cooked up a few shortcodes and partials to handle my specific neuroses.

# The `{{</* blogroll */>}}` shortcode

I thought it would be nice to autogenerate a [/blogroll](/blogroll) page from my RSS reader's [`opml export`](/blogroll.xml), which now lives comfortably in `/data/blogroll.xml`. 

RSS readers aren't always great at keeping the top-level domain. They often just store the feed URL. I needed a way to link to the actual website instead of a wall of raw XML. I came up with a "good enough" solution using `urls.Parse`, and now I can drop a blogroll anywhere with a single tag:

```html
<ul>
  {{ range .Site.Data.blogroll.body.outline }}
    {{ if .outline }}
      <li><strong>{{ index . "-text" | default (index . "text") }}</strong>
        <ul>
          {{ range .outline }}
            {{ $rawUrl := index . "-htmlUrl" | default (index . "htmlUrl") | default (index . "-xmlUrl") | default (index . "xmlUrl") }}
            {{ $urlObj := urls.Parse $rawUrl }}
            {{ $domainOnly := printf "%s://%s/" $urlObj.Scheme $urlObj.Host }}
            <li><a href="{{ $domainOnly }}" target="_blank" rel="noopener">{{ index . "-text" | default (index . "text") }}</a></li>
          {{ end }}
        </ul>
      </li>
    {{ else }}
      {{ $rawUrl := index . "-htmlUrl" | default (index . "htmlUrl") | default (index . "-xmlUrl") | default (index . "xmlUrl") }}
      {{ $urlObj := urls.Parse $rawUrl }}
      {{ $domainOnly := printf "%s://%s/" $urlObj.Scheme $urlObj.Host }}
      <li><a href="{{ $domainOnly }}" target="_blank" rel="noopener">{{ index . "-text" | default (index . "text") }}</a></li>
    {{ end }}
  {{ end }}
</ul>
```

# The `{{</* img */>}}` shortcode

I've always wanted centered captions for my images. So, I wrote this small shortcode (`/layouts/shortcodes/img.html`) to wrap everything in a proper `<figure>` tag:

```html
<figure class="custom-figure" style="max-width: {{ .Get "width" }}px; margin: 2rem auto;">
  <img 
    src="{{ .Get "src" }}" 
    alt="{{ .Get "caption" }}" 
    style="width:100%; height:auto; border:1px solid #ddd"
  >
  {{ with .Get "caption" }}
    <figcaption style="font-size: 0.85rem; color: #666; margin-top: 0.5rem; text-align: center;">
      {{ . }}
    </figcaption>
  {{ end }}
</figure>
```

# Quotes in the footer

I’ve wanted a random quote generator. 

I'm not sure if this is a Millennial nostalgia thing, but I’ve added this "inspiration" engine to the site footer (`/layouts/partials/footer`):

```html
{{ if (.Param "showQuote") }}
    <div class="mpt">
        <div id="quote-container">
            <p id="quote-text">Loading inspiration...</p>
            <small id="quote-author"></small>
        </div>
    </div>
    <script>
    (function() {
        const quotes = [
            { text: "It is so shocking to find out how many people do not believe that they can learn, and how many more believe learning to be difficult.", author: "Frank Herbert, Dune" },
            { text: "Highly organized research is guaranteed to produce nothing new.", author: "Frank Herbert, Dune" },
            { text: "Static sites are the future, and the past.", author: "Anonymous" }
        ];

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selected = quotes[randomIndex];

        document.getElementById('quote-text').innerText = `"${selected.text}"`;
        document.getElementById('quote-author').innerText = `- ${selected.author}`;
    })();
    </script>
{{ end }}
```

The quotes are mostly features Frank Herbert, Isaac Asimov, Leibniz, the occasional Ancient Greek Mathematician and Philosopher + some of the more modern figures you encounter in your math text books. It gives the blog an air of intellectuality which, by modern standards, is probably a little cringy. I'm okay with that.

# Related articles

To try and convince the reader that I’m worth more than five minutes of their time, I added a custom recommendation section (`/layouts/partials/related.html`):

```html
{{ $related := where .Site.RegularPages ".Params.categories" "intersect" .Params.categories }}
{{ $related = $related | complement (slice .) }}
{{ if $related }}
  <div class="mp related-posts">
    <h3>Related Articles</h3>
    <p class="related-posts-intro">I'm so glad you made it to the end. The following articles are loosely related to this one:</p>
    <ul class="related-posts-list">
      {{ range first 5 $related }}
        <li class="related-post-item">
          <time class="related-post-date" datetime="{{ .Date.Format "2006-01-02" }}">
            {{ .Date.Format "Jan 02, 2006" }}
          </time>
          &mdash; 
          <a class="related-post-link" href="{{ .RelPermalink }}">{{ .Title }}</a>
        </li>
      {{ end }}
    </ul>
  </div>
{{ end }}
```

# PR Contributions

I frequently do mistakes, and even if I review my articles, sometimes a new pair of eyes is needed. So for each page I invite all the potential reviewers to open a PR in case something is missing, or it's wrong.

```html
<div class="mp github-source">
  <h3>Source Code & Contributions</h3>
  <p class="github-source-text">
      Spot an error or have an improvement? 
      <a href="[https://github.com/nomemory/andreinc-hugo/edit/main/content/](https://github.com/nomemory/andreinc-hugo/edit/main/content/){{ .File.Path }}" target="_blank" rel="noopener" class="github-link">
      Open a PR directly for this article
      </a>.
  </p>
</div>
```

# Better filtering

Finally, I’ve cleaned up the taxonomies. 

It’s now much easier for users to filter out my "personal" rambling ([/persona](/categories/persona/)) from the more "serious" content related to [math](/categories/math) and [programming](/categories/programming).

The separation isn't perfect, but it’s a start. 

Now, if only I could find the motivation to actually write the content I'm so busy Categorizing.