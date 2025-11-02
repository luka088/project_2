function toonInhoud(onderdeel) {
  const container = document.getElementById("cv-extra");

  const inhoud = {
    talen: `
      <div class="extra-col">
        <h4>Talenkennis</h4>
        <ul>
          <li><div class="alert alert-success" role="alert">nederlands - expert</div></li>
          <li><div class="alert alert-success" role="alert">Engels - heel goed</div></li>
          <li><div class="alert alert-warning" role="alert">frans - basiskennis</div></li>
        </ul>
      </div>
    `,
    school: `
      <div class="extra-col">
        <h4>Opleiding</h4>
        <ul>
          <li>de Rozenberg - tot 3de jaar</li>
          <li>Sint Elisabeth - tot 4de jaar</li>
          <li>Volwassenen onderwijs - ICT en Administratie</li>
          <li><h6>huidige opleiding</h6></li>
          <li>Graduaat programmeren</li>
        </ul>
      </div>
    `,
    ervaring: `
      <div class="extra-col">
        <h4>Studentenjob</h4>
        <ul>
          <li>Sun parks - Mol rauw</li>
        </ul>
      </div>
    `,
    skills: `
      <div class="extra-col">
        <h4>Skills</h4>
        <div class="multi-carousel-container" id="multiCarousel">
          <div class="multi-carousel-inner" id="carouselInner">
            <div class="multi-carousel-item" data-index="0">
              <div class="img-container"><span class="item-number">1</span>
                <img src="img/html.png" alt="html logo">
              </div>
            </div>
            <div class="multi-carousel-item" data-index="1">
              <div class="img-container"><span class="item-number">2</span>
                <img src="img/css-3.png" alt="css logo">
              </div>
            </div>
            <div class="multi-carousel-item" data-index="2">
              <div class="img-container"><span class="item-number">3</span>
                <img src="img/database.png" alt="SQL logo">
              </div>
            </div>
            <div class="multi-carousel-item" data-index="3">
              <div class="img-container"><span class="item-number">4</span>
                <img src="img/bootstrap.png" alt="bootstrap logo">
              </div>
            </div>
            <div class="multi-carousel-item" data-index="4">
              <div class="img-container"><span class="item-number">5</span>
                <img src="img/c-.png" alt="c# logo">
              </div>
            </div>
          </div>
          <button class="multi-carousel-control-prev" id="prevBtn">◀</button>
          <button class="multi-carousel-control-next" id="nextBtn">▶</button>
        </div>
      </div>
    `
  };

  container.innerHTML = inhoud[onderdeel];

  // 👉 Activeer de carousel als "skills" gekozen is
  if (onderdeel === "skills") {
    // Wacht tot DOM klaar is en activeer dan de carousel
    setTimeout(() => {
      if (typeof initCarousel === "function") {
        initCarousel();
      }
    }, 0);
  }
}