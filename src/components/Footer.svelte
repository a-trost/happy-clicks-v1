<script>
  export let tags;
  let year = new Date().getFullYear();

  // tags object to array
  tags = Object.keys(tags)
    .map(function (key) {
      return tags[key];
    })
    .sort(function (a, b) {
      return b.count - a.count;
    });
</script>

<footer class="hacl-footer">
  <div class="hacl-footer__container">
    <div class="hacl-footer__column hacl-footer__column--meta">
      <img
        src="/assets/logo.svg"
        class="hacl-footer__logo"
        alt="Happy Clicks"
      />
      <p class="hacl-mb-none">&copy; {year} Alex Trost</p>
      <p class="hacl-mb-none">Made with Prismic, Cloudinary & Astro</p>
    </div>
    <div class="hacl-footer__column hacl-footer__column--navigation">
      <h3 class="hacl-footer__heading">Navigation</h3>
      <ul class="hacl-footer__list">
        <li class="hacl-footer__list-item">
          <a href="/">Home</a>
        </li>
        <li class="hacl-footer__list-item">
          <a href="/about">About</a>
        </li>
      </ul>
    </div>
    <div class="hacl-footer__column hacl-footer__column--categories">
      <h3 class="hacl-footer__heading">Categories</h3>
      <ul class="hacl-footer__list">
        <li class="hacl-footer__list-item">
          <a href="/categories">All</a>
        </li>
        {#each tags as tag}
          <li class="hacl-footer__list-item">
            <a href="/categories/{tag.uid}">{tag.name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <svg
    class="hacl-footer__blue-zig hacl-footer__decoration"
    width="359"
    height="192"
    viewBox="0 0 359 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M341.632 175.809C312.117 143.721 205.74 28.3241 202.597 36.673C198.668 47.1091 151.456 176.717 141.076 168.375C129.418 159.005 57.2609 61.8876 17.5639 14.925"
      stroke-width="45"
    />
  </svg>
  <svg
    class="hacl-footer__yellow-squiggle hacl-footer__decoration"
    width="221"
    height="170"
    viewBox="0 0 221 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.8"
      d="M3.81228 10.45C26.5573 18.36 87.9569 57.4189 64.1073 81.1405C38.4062 106.704 -23.9141 49.834 37.5741 38.9409C101.363 27.6403 161.272 84.0124 146.746 132.395C132.421 180.105 41.0668 99.8461 120.84 95.6006C184.659 92.2043 208.051 141.665 210.081 168.236"
      stroke="#FCC00E"
      stroke-width="20.5589"
    />
  </svg>
  <svg
    class="hacl-footer__red-circle hacl-footer__decoration"
    width="165"
    height="165"
    viewBox="0 0 165 165"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle opacity="0.8" cx="82.0529" cy="82.554" r="82.0167" fill="#F7551C" />
  </svg>
  <script
    src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.4.0/dist/lazyload.min.js"></script>
  <script
    defer
    data-domain="happyclicks.dev"
    src="https://plausible.io/js/plausible.js"></script>
</footer>
