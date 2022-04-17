<script>
  import { onMount } from "svelte";
  let id;
  let title = "Confirming...";
  async function postData(uid) {
    const url = "/.netlify/functions/confirm-email?id=" + uid;

    const result = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await result.json();
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");
    window.history.replaceState({}, document.title, "/" + "confirm-email");
    if (id) {
      const result = await postData(id);
      console.log(result, "YES");
      if (result?.message) {
        title = result.message;
      }
    } else {
      title = "Invalid confirmation link";
    }
  });
</script>

<h1>{title}</h1>
