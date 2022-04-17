<script>
  export let posts;
</script>

<div class="hacl-section hacl-section--center">
  <ul class="hacl-column-container">
    {#each posts as post}
      <li class="hacl-card">
        <div class="hacl-card-content">
          <a
            class="hacl-card__link"
            href={`/posts/${post.uid}`}
            aria-label={post.title}
          >
            <video
              width={1920}
              height={1080}
              data-poster={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.jpg`}
              data-src={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.webm`}
              class="hacl-card__video lazy"
              alt={post.alt_text}
              loop
              muted
            >
              <source
                src={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.webm`}
                type="video/webm"
              />
              <source
                src={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.mp4`}
                type="video/mp4"
              />
              <source
                src={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.ogv`}
                type="video/ogg"
              />
              <img
                src={`https://res.cloudinary.com/frontendhorse/video/upload/w_500/happyclicks/${post.cloudinary_video_id}.jpg`}
                alt=""
              />
            </video>
          </a>
          <p class="hacl-card__credit">{post.source_name}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>
