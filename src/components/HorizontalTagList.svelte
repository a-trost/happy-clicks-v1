<script>
  import { onMount } from "svelte";
  export let tags;
  export let pagePath;
  let categoryBar, showLeftArrow, showRightArrow;

  // Sort tags object into array based on tags.count
  const sortedTags = Object.keys(tags).sort(
    (a, b) => tags[b].count - tags[a].count
  );
  onMount(() => {
    checkScrollPosition();
  });

  function checkScrollPosition() {
    if (!categoryBar) return;
    const scrollLeft = categoryBar.scrollLeft;
    const scrollWidth = categoryBar.scrollWidth;
    const offsetWidth = categoryBar.offsetWidth;

    // Handle Right Arrow
    if (scrollWidth === offsetWidth) {
      showRightArrow = false;
    } else if (scrollLeft + offsetWidth >= scrollWidth - 5) {
      showRightArrow = false;
    } else {
      showRightArrow = true;
    }

    // Handle Left Arrow
    if (scrollLeft === 0) {
      showLeftArrow = false;
    } else {
      showLeftArrow = true;
    }
  }

  if (categoryBar?.scrollWidth > categoryBar?.offsetWidth) {
    showRightArrow = true;
  }

  const handleScroll = () => {
    checkScrollPosition();
  };

  const handleRightArrowClick = () => {
    categoryBar.scrollLeft += categoryBar.offsetWidth;
    checkScrollPosition();
  };

  const handleLeftArrowClick = () => {
    categoryBar.scrollLeft -= categoryBar.offsetWidth;
    checkScrollPosition();
  };
</script>

<div class="hacl-filter-categories">
  <span class="scroll scroll-backward">
    <button
      id="category-list-left-arrow"
      class="hacl-filter-categories__icon"
      class:hidden={!showLeftArrow}
      type="button"
      on:click={handleLeftArrowClick}
    >
      <object
        type="image/svg+xml"
        data="/images/icons/left-chevron.svg"
        aria-label="Scroll Left"
      />
    </button>
  </span>
  <span class="scroll scroll-forward">
    <button
      id="category-list-right-arrow"
      class="hacl-filter-categories__icon"
      class:hidden={!showRightArrow}
      type="button"
      on:click={handleRightArrowClick}
    >
      <object
        type="image/svg+xml"
        data="/assets/icons/right-chevron.svg"
        aria-label="Scroll Right"
      >
        ➡
      </object>
    </button>
  </span>
  <ul
    class="hacl-category-list"
    bind:this={categoryBar}
    on:scroll={checkScrollPosition}
  >
    <li class="hacl-category-list__item" class:selected={pagePath === ""}>
      <a href={`/`}>
        <span class="tag">All</span>
      </a>
    </li>

    {#each sortedTags.slice(0, 6) as tag}
      <li
        class="hacl-category-list__item"
        key={tag}
        class:selected={pagePath === tags[tag].uid}
      >
        <a href={`/categories/${tags[tag].uid}`}>
          <span class="tag">
            {tag.slice(0, 1).toLocaleUpperCase() + tag.slice(1)}
          </span>
        </a>
      </li>
    {/each}
    <li class="hacl-category-list__item">
      <a href={`/categories/`}>
        <span class="tag">
          <svg
            width="17"
            height="4"
            viewBox="0 0 21 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.52943" cy="2.00001" r="1.94032" fill="#276A91" />
            <circle cx="10.41" cy="2.00001" r="1.94032" fill="#276A91" />
            <circle cx="18.2907" cy="2.00001" r="1.94032" fill="#276A91" />
          </svg>
        </span>
      </a>
    </li>
  </ul>
</div>
