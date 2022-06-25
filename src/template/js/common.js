var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap'),
    classOverflow = 'overflow-disable';

document.addEventListener('DOMContentLoaded', ()=>{
  // header
  const header = document.querySelector('.header'),
        ham    = document.getElementById('ham'), 
        headerClassWhite = '--white';
        headerClassOpen  = '--open';

  if (header.dataset.white) {
    headerToggleClass();
    window.addEventListener('scroll', headerToggleClass);
  }

  ham.addEventListener('click', toggleHeaderClassOpen);

  function headerToggleClass() {
    if (window.pageYOffset == 0) {
      header.classList.add(headerClassWhite);
    } else {
      header.classList.remove(headerClassWhite);
    }
  }

  function toggleHeaderClassOpen() {
    header.classList.toggle(headerClassOpen);
    html.classList.toggle(classOverflow);
    body.classList.toggle(classOverflow);
    wrap.classList.toggle(classOverflow);
  }
    
  // lines
  let linesBlocks = document.querySelectorAll('.lines');
  if (linesBlocks) {
    linesBlocks.forEach((linesBlock)=>{
      for (let i = 0; i <= 4; i++) {
        let div = document.createElement('div');
        div.className = 'lines__line';
        linesBlock.append(div);
      }
    })
  }

  // intro
  const introVideo  = document.querySelector('.intro__video video'),
        introVolume = document.querySelector('.intro__volume');
        introVolumeClass = '--unmute';
    
  if (introVideo) {
    introVolume.addEventListener('click', ()=>{
      introVolume.classList.toggle(introVolumeClass);
      introVideo.muted = !introVideo.muted;
    });
  }

	// Fields
	let fields = document.querySelectorAll('.field');
	 
	if (fields) {
		fields.forEach((field)=>{
			new Field(field);

      if (field.classList.contains('--phone')) {
        IMask(field.area, {
          mask: '+{7} (000) 000-00-00'
        });
      }
		});
	}


	// Checks
	let checks = document.querySelectorAll('.check');
	 
	if (checks) {
		checks.forEach((check)=>{
			new Check(check);
		});
	}


	// Selects
	var selects = document.querySelectorAll('.select');
	if (selects) {
			selects.forEach(select => {
		  new Select(select);
		});

		document.addEventListener('click', (event)=>{
			let openSelects = document.querySelectorAll('.select.--open');
			if (!event.target.closest('.select') && openSelects) {
				openSelects.forEach((select)=> {
					select.classList.remove(Select.classOpen);
				});
			}
		})
	}


  const newsSlider = document.querySelector('.news__slider');
  if (newsSlider) {
    new Swiper(newsSlider, {
      slidesPerView: 'auto'
    });
  }

  let map = document.getElementById('map');
  ymaps.ready(function () {
      var coords = map.getAttribute('data-position').split(', ');
      
      coords = coords.map((coord)=>{
        return Number(coord);
      });


      console.log(coords);

      var myMap = new ymaps.Map(map, {
        center: coords,
        zoom: 15,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });

      let placemark = new ymaps.Placemark(coords, { }, {
        iconLayout: 'default#image',
        iconImageHref: 'uploads/icons/placemark.png',
        iconImageSize: [67, 83],
        iconImageOffset: [-33, -42],
      });

      myMap.geoObjects.add(placemark);
  });

  Fancybox.bind("[data-fancybox]", {
    dragToClose: false,
    autoFocus: false,
  });
});
