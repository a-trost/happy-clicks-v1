<script>
  import { onMount } from "svelte";
  export let likeCount, uid;

  let liked = false;
  let likedInThisSession = false;
  let storageLikes, displayCount;

  // TODO: Make this take a number of likes up to 10

  onMount(() => {
    const storage = localStorage.getItem("likedPosts");

    storageLikes = storage ? JSON.parse(storage) : {};

    liked = !!storageLikes[uid];
  });

  // Handle localstorage like feature
  const handleLikeClick = () => {
    liked = !liked;
    likedInThisSession = liked;
    // Check if storageLikes[uid] exists at all
    if (!storageLikes.hasOwnProperty(uid)) {
      // if it doesn't, send the Like to the DB
      postData(uid);
    }
    // If it does, they've interacted before, so we just update local storage
    storageLikes[uid] = liked;
    localStorage.setItem("likedPosts", JSON.stringify(storageLikes));
  };

  async function postData(uid) {
    const url = "/.netlify/functions/like-post?uid=" + uid;

    await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  $: displayCount = likeCount + (liked ? 1 : 0);
</script>

<button class="hacl-like-button" class:liked on:click={handleLikeClick}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
  {displayCount}</button
>
