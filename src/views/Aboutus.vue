<template>
  <div class="grid justify-items-center mt-28">
    <div class="row ">
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/pt.png"
            class="h-96 "
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Phopthorn Patcharoen</h5>
            <h6 class="card-subtitle mb-2 text-muted">62130500070</h6>
            <a href="https://www.facebook.com/ppong.patcharoen" class="btn mr-2"
              ><i class="fas fa-link"></i> Visit Site</a
            >
            <a href="https://github.com/PongzZzZ" class="btn"
              ><i class="fab fa-github"></i> Github</a
            >
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/chai.jpg"
            class=""
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Somchai Chasa</h5>
            <h6 class="card-subtitle mb-2 text-muted">62130500091</h6>
            <a href="https://www.facebook.com/mynamechaii/" class="btn mr-2"
              ><i class="fas fa-link"></i> Visit Site</a
            >
            <a href="https://github.com/somchaii221242" class="btn"
              ><i class="fab fa-github"></i> Github</a
            >
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/pan.jpg"
            class=""
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Attapon Jeamjumroensuk</h5>
            <h6 class="card-subtitle mb-2 text-muted">62130500119</h6>
            <a href="https://www.facebook.com/zATPPAN" class="btn mr-2"
              ><i class="fas fa-link"></i> Visit Site</a
            >
            <a href="https://github.com/62130500119" class="btn"
              ><i class="fab fa-github"></i> Github</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --gradient: linear-gradient(to left top, #dd2476 10%, #ff512f 90%) !important;
}

.card {
  background: #222;
  border: 1px solid #dd2476;
  color: rgba(250, 250, 250, 0.8);
  margin-bottom: 2rem;
}

.btn {
  border: 5px solid;
  border-image-slice: 1;
  background: var(--gradient) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  border-image-source: var(--gradient) !important;
  text-decoration: none;
  transition: all 0.4s ease;
}

.btn:hover,
.btn:focus {
  background: var(--gradient) !important;
  -webkit-background-clip: none !important;
  -webkit-text-fill-color: #fff !important;
  border: 5px solid #fff !important;
  box-shadow: #222 1px 0 10px;
  text-decoration: underline;
}
</style>
