<script>
  let mobileToggle;
  let toggleOpen = false;

  const handleButtonClick = () => {
    toggleOpen = !toggleOpen;
  };
</script>

<div aria-labelledby="hacl-siteid" class="hacl-sitenav">
  <div class="hacl-sitenav__container">
    <div class="hacl-sitenav__logo-wrapper">
      <a id="hacl-siteid" href="/">
        <img
          src="/assets/logo.svg"
          alt="Happy Clicks"
          width="134"
          height="48"
        />
      </a>
      <span class="hacl-sitenav__tagline">
        Delightful interaction inspiration
      </span>
    </div>
    <nav class="hacl-sitenav__navigation hacl-list-unstyled">
      <button
        bind:this={mobileToggle}
        on:click={handleButtonClick}
        class="hacl-sitenav__mobile-toggle"
        aria-expanded={toggleOpen}
        alt="Nav Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="state-open"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          class="state-close"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul
        class="hacl-sitenav__navlist hacl-list-unstyled"
        class:is-active={toggleOpen}
      >
        <li class="hacl-sitenav__item hacl-sitenav__item-categories">
          <a href="/categories" class="">Categories</a>
        </li>
        <li class="hacl-sitenav__item hacl-sitenav__item-categories">
          <a href="/submit" class="">Submit</a>
        </li>
        <li class="hacl-sitenav__item hacl-sitenav__item-subscribe">
          <a href="/subscribe" class="">Subscribe</a>
        </li>
        <li class="hacl-sitenav__item hacl-sitenav__item-toggle">
          <label class="hacl-sitenav__toggle-form">
            <input
              type="checkbox"
              id="hacl-sitenav__reduced-motion-toggle"
              class="hacl-sitenav__toggle hacl-sitenav__toggle"
            />
            Autoplay Videos
          </label>
        </li>
      </ul>
    </nav>
  </div>
</div>
