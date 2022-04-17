<script>
  import JSConfetti from "js-confetti";
  import { onMount } from "svelte";

  const FRESH = "fresh";
  const SUBMITTING = "submitting";
  const SUBMITTED = "submitted";
  const ERROR = "error";

  let mediaQuery;
  let jsConfetti;
  let status = FRESH;

  $: buttonText = renderButtonText(status);

  function renderButtonText(status) {
    switch (status) {
      case FRESH:
        return "Send me Happy Clicks!";
      case SUBMITTING:
        return "Submitting...";
      case SUBMITTED:
        return "Success!";
      case ERROR:
        return "Error!";
    }
  }

  const options = ["🎉", "👏", "✨", "😎", "🤩"];

  onMount(async () => {
    jsConfetti = new JSConfetti();
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  });

  async function onSubmit(e) {
    if (status === SUBMITTING || status === SUBMITTED) {
      return;
    }
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const { a_password, confetti, email, fname } = data;
    // If Honeypot filled, return
    if (a_password.length) {
      status = ERROR;
      return;
    }

    if (email.length) {
      status = SUBMITTING;
      const result = await postData({
        email,
        fname,
        a_password,
        confetti,
      });
      if (result.status === 200) {
        status = SUBMITTED;
        if (confetti !== "none") {
          fireConfetti(confetti);
        }
      }
    }
  }

  function fireConfetti(confetti) {
    const confettiSettings = {
      emojis: [confetti],
    };
    if (mediaQuery.matches) {
      confettiSettings.emojiSize = 60;
      confettiSettings.confettiNumber = 10;
    }
    jsConfetti.addConfetti(confettiSettings);
  }

  async function postData({ email, fname, a_password, confetti }) {
    const url = "/.netlify/functions/add-email";

    const result = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fname,
        honeypot: a_password,
        confetti,
      }),
    });

    return result;
  }
</script>

<div class="container">
  <h1 class="hacl-h3 hacl-text-center">
    Interaction inspiration for your inbox
  </h1>
  <p id="submit">
    A collection of the newest happy inspiration, delivered to your inbox
    weekly.
  </p>

  <form class="hacl-form" action="" on:submit|preventDefault={onSubmit}>
    <label>
      First name
      <input type="text" name="fname" autocomplete="on" placeholder="Alex" />
    </label>
    <label
      ><span>Email address<span class="hacl-form--required">*</span></span>
      <input
        type="email"
        autocomplete="on"
        name="email"
        required
        placeholder="alex@happyclicks.dev"
      />
    </label>
    <label style="display:none !important">
      Password
      <input
        type="text"
        name="a_password"
        style="display:none !important"
        tabindex="-1"
        autocomplete="off"
      />
    </label>
    <label for="confetti">
      Choose your confetti
      <div class="option-container">
        {#each options as option, index}
          <label for={option} class="option">
            <input
              type="radio"
              id={option}
              name="confetti"
              value={option}
              checked={index === 0}
            />
            <span>{option}{option}{option}{option}{option}</span>
          </label>
        {/each}
        <label for="none" class="option">
          <input type="radio" id="none" name="confetti" value="none" />
          <span>None</span>
        </label>
      </div>
    </label>
    <button class="hacl-mt-2" type="submit">{buttonText}</button>
  </form>
  {#if status === SUBMITTED}<p>
      Success! Check your email to confirm your email address.
    </p>{/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
  }

  .hacl-mt-2 {
    margin-top: 2rem;
  }
</style>
