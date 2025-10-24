---
layout: default
title: "Adrian Leonard Mociulschi"
tagline: "A Symbolic Ambassador of Technoculture"
description: "RSS Feed: essays, op-eds, and projects on technoculture by Adrian Leonard Mociulschi, and algorithmic visibility."
image: "https://adrian-leonard-mociulschi.github.io/assets/og/og-cover-adi-futura-1200x630.png"
date: "2025-10-24T00:00:00+03:00"
lang: "en-US"
keywords: "Adrian Leonard Mociulschi, Articles, România Liberă, Nine O'Clock, Contributors, Op-ed, RSS Feed, News, Cultural journalism"
permalink: /rss/feed/
---

[Home](/) · [About](/about) · [Writings](/writing) · [Op & Ed](/blog) · [V-Box](/ai-muse)

---

<a id="top"></a>

<section markdown="1" class="rss-landing" style="max-width: 720px; margin: 0; text-align:left;">
## Become a subscriber to receive news via RSS.

RSS is a standardized format that news aggregators (like Feedly, Inoreader, and Outlook) use to distribute new articles.

{% assign feed_url = '/feed.xml' | absolute_url %}

<div class="rss-actions" style="display:flex; flex-wrap:wrap; gap:12px; margin: 18px 0 8px; justify-content:flex-start;">
  <a class="btn rss-btn" href="https://feedly.com/i/subscription/feed/{{ feed_url }}" target="_blank" rel="noopener">
    <span class="icon" aria-hidden="true">📡</span>
    <span>Sign up for a subscription to Feedly</span>
  </a>
  <a class="btn rss-btn ghost" href="{{ feed_url }}" target="_blank" rel="noopener">
    <span class="icon" aria-hidden="true">🧩</span>
    <span>Open RSS Feed</span>
  </a>
  <button class="btn rss-btn outline" type="button" id="copyRssBtn" data-rss="{{ index.md_url }}">
    <span class="icon" aria-hidden="true">🔗</span>
    <span>Copy RSS link</span>
  </button>
</div>

In the application, insert the RSS link into the "Follow Source" field. This will enable you to explore and subscribe to our news feed.
</section>

<style>
  .main-content { text-align:left; }
  .rule{ border:0; height:1px; background:#ccc; margin:16px 0; }
  .rss-landing h2 { color:#1e6bb8; margin: 0 0 8px; }
  .rss-btn{
    display:inline-flex; align-items:center; justify-content:flex-start; gap:10px;
    padding:10px 14px; border-radius:999px;
    background: linear-gradient(180deg, rgba(30,107,184,.20) 0%, rgba(30,107,184,.28) 100%);
    color:#fff; text-decoration:none; font-weight:700; font-size:.95em; line-height:1;
    border:1px solid rgba(255,255,255,.35);
    box-shadow:0 10px 24px rgba(0,0,0,.12);
    transition: transform .12s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease;
    text-align:left;
  }
  .rss-btn:hover, .rss-btn:focus-visible{
    outline:none;
    background: linear-gradient(180deg, rgba(30,107,184,.28) 0%, rgba(30,107,184,.34) 100%);
    box-shadow: 0 12px 30px rgba(0,0,0,.18);
    border-color: rgba(255,255,255,.55);
  }
  .rss-btn.ghost{
    background: transparent; color:#1e6bb8;
    border-color: rgba(30,107,184,.45);
  }
  .rss-btn.ghost:hover, .rss-btn.ghost:focus-visible{
    background: rgba(30,107,184,.08);
    border-color: rgba(30,107,184,.75);
  }
  .rss-btn.outline{
    background: transparent; color:#1e6bb8;
    border-color: rgba(30,107,184,.45);
    appearance: none;
    -webkit-appearance: none;
    text-align: left;
    padding-left: 14px;
  }
  .rss-btn.outline:hover, .rss-btn.outline:focus-visible{
    background: rgba(30,107,184,.08);
    border-color: rgba(30,107,184,.75);
  }
  .rss-btn .icon{ font-size:1.05em; line-height:1; }
  @supports ((backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px))){
    .rss-btn{
      -webkit-backdrop-filter: saturate(140%) blur(8px);
      backdrop-filter: saturate(140%) blur(8px);
      background: linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.12) 100%),
                  linear-gradient(180deg, rgba(30,107,184,.28) 0%, rgba(30,107,184,.34) 100%);
    }
  }
  @media (prefers-color-scheme: dark){ .rss-btn{ box-shadow: 0 12px 28px rgba(0,0,0,.45); } }
</style>

<script>
(function(){
  var btn = document.getElementById('copyRssBtn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    var url = btn.getAttribute('data-rss');
    if (!navigator.clipboard) {
      var ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); } catch(_){ }
      document.body.removeChild(ta);
    } else {
      navigator.clipboard.writeText(url).catch(function(){});
    }
    btn.classList.add('copied');
    btn.innerHTML = '<span class="icon" aria-hidden="true">✅</span><span>Copiat!</span>';
    setTimeout(function(){
      btn.classList.remove('copied');
      btn.innerHTML = '<span class="icon" aria-hidden="true">🔗</span><span>Copiază linkul RSS</span>';
    }, 1800);
  });
})();
</script>
