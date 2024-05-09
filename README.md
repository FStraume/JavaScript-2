# JavaScript-2

JavaScript 2 repository for the JS2 CA

<div class="card mb-3 shadow-sm">
    <img src="${post.media.url}" class="card-img-top" alt="${post.media.alt}" style="object-fit: cover; height: 200px;">
    <div class="card-body">
        <h5 class="card-title text-dark">${post.title}</h5>
        <a href="#" class="stretched-link text-decoration-none"></a> <!-- Makes the entire card clickable -->
        <p class="card-text"><small class="text-muted">${timestamp}</small></p>
        <div class="d-flex justify-content-between">
            <span class="badge bg-primary">Comments ${post._count.comments}</span>
            <span class="badge bg-success">Likes ${post._count.reactions}</span>
        </div>
    </div>
</div>

<div class="card col p-0 mb-3">
        <img src="${post.media.url}" class="card-img-top ch-100 ch-sm-33 ch-lg-25 object-cover border-bottom border-secondary" alt="${post.media.alt}"/>
            <div class="card-body pt-0">
            <div class="row justify-content-between">
              <div class="col">
              <p class="card-text"><small class="text-muted">Comments ${post._count.comments}</small></p>
              </div>
              <div class="col">
              <p class="card-text"><small class="text-muted float-end">Likes ${post._count.reactions}</small></p>
              </div>
              </div>
              <a href="#" class="card-title text-dark text-decoration-underline">@TEST</a>
              <p class="card-text">${post.title}</p>
              <p class="card-text"><small class="text-muted">${timestamp}</small></p>
            </div>
          </div>
