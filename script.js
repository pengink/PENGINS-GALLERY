// lightbox controller
const lightbox = document.createElement('div');
 lightbox.id = 'lightbox'
 document.body.appendChild(lightbox);

 const images = document.querySelectorAll('.grid-item'); // save volume level you
 images.forEach(image => {
  if (image.tagName == 'IMG') {image.loading = 'lazy';}
  image.addEventListener('click', () => {
          lightbox.classList.add('active');
          const img = document.createElement(image.tagName);
          const placeholder = document.createElement(image.tagName);
          img.loading = 'eager'
          placeholder.classList.add('blur');
          placeholder.src = image.src

          if (image.tagName == 'VIDEO') {
            img.autoplay = true;
            img.controls = true;
            img.loop = true;
            img.src = image.src
          } 
          if (image.tagName == 'IMG') {
            let filename = image.src.substring(image.src.lastIndexOf('/'), image.src.lastIndexOf('.'));
            let extensions = ['.png', '.jpg', '.webp', '.gif']
            let extension = 0
            img.onerror = function() {
              if (extension < extensions.length) {
                extension += 1
              } else {img.src = image.src}
              img.src = 'ImageLibrary'+filename+extensions[extension];
            }
            img.src = 'ImageLibrary'+filename+extensions[extension];
            lightbox.appendChild(placeholder);
          }

          while (lightbox.firstChild) {
            for (var i=0;i=lightbox.children.length;i++) {
              lightbox.removeChild(lightbox.lastChild);
            }
          }
          lightbox.appendChild(img);
          lightbox.appendChild(placeholder);
    
          document.body.style.overflowY = 'hidden';
      });
  });
 lightbox.addEventListener('click', e =>  {
    if (e.target !== lightbox && lightbox.firstChild.tagName == "VIDEO") {return}
    lightbox.classList.remove('active');
    for (var i=0;i=lightbox.children.length;i++) {
              lightbox.removeChild(lightbox.lastChild);
    }
    document.getElementsByClassName("Body").maxHeight = "auto"
    document.body.style.overflowY = 'scroll';
 });


 //music controller
music.volume = 0.1;
document.getElementById("musicPlayer").addEventListener('click', () => {
    let music = document.getElementById("music");
    let player = document.getElementById("musicPlayer");
    if (music.paused == true) {
        music.play();
        player.textContent = "Click to pause pretensious museum music."
    } else {
        player.textContent = "Click to play pretensious museum music."
        music.pause();

    }
});

// var rgb

let root = document.documentElement;

images.forEach(image => {
    image.addEventListener('mouseover', () => {
        var rgb = getAverageRGB(image);
        let newColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
        root.style.setProperty('--newColor', newColor)
        root.style.setProperty('--newShadow', 'rgba('+rgb.r+','+rgb.g+','+rgb.b+', 0.6)');  // set new color value here
       // document.body.style.backgroundColor = newColor
     });
    image.addEventListener('mouseout', () => {
       /*  root.style.setProperty('--newColor', 'black')
        root.style.setProperty('--newShadow', 'black');*/
    });
});

function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
}

// masonry
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName('gallery')[0],
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('column-gap')),
      //rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      rowHeight = 0
    let content = ".grid-item img";
    if (!item.querySelector(content))
        content = ".grid-item video";

    var rowSpan = Math.ceil((item.querySelector(content).getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    /* Set the spanning as calculated above (S) */
    item.style.gridRowEnd = 'span '+ rowSpan;
}

function resizeAllMasonryItems(){
  var allItems = document.getElementsByClassName("grid-item");
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}

function waitForImages() {
  var allItems = document.getElementsByClassName("grid-item");
  for(var i=0;i<allItems.length;i++){
    imagesLoaded( allItems[i], function(instance) {
      var item = instance.elements[0];
      resizeMasonryItem(item);
    });
  }
}

var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
});

waitForImages();


// if in viewport
var gridItems = document.querySelectorAll('.grid-item');
const bannerImg = document.querySelector('#bannerImg');

const observer1 = new IntersectionObserver((entry) => {
  if (entry.at(0).isIntersecting) {
    entry.at(0).target.classList.add('in-viewport');
  } else {
    entry.at(0).target.classList.remove('in-viewport');
    }
  }, {
    threshold : 0.4
  }
);
  observer1.observe(bannerImg);

function intersectionObserve() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-viewport');
      } else {
      entry.target.classList.remove('in-viewport');
      } 
    });
  }, {
    threshold: 0
  }
);
  gridItems.forEach((item) => {
    observer.observe(item);
  });
}


// check orientation
const portraitMediaQuery = window.matchMedia("(orientation: portrait)");

portraitMediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    const onlyImages = document.querySelectorAll('#bannerPortrait img');
    document.getElementById('bannerImg').src = onlyImages.item(Math.floor(Math.random() * onlyImages.length)).src;
  } else {
    const onlyImages = document.querySelectorAll('#bannerLandscape img');
    document.getElementById('bannerImg').src = onlyImages.item(Math.floor(Math.random() * onlyImages.length)).src;
  }
})

if (portraitMediaQuery.matches) {
  const onlyImages = document.querySelectorAll('#bannerPortrait img');
  document.getElementById('bannerImg').src = onlyImages.item(Math.floor(Math.random() * onlyImages.length)).src;
} else {
  const onlyImages = document.querySelectorAll('#bannerLandscape img');
  document.getElementById('bannerImg').src = onlyImages.item(Math.floor(Math.random() * onlyImages.length)).src;
}

// check grind
const checkboxes = document.querySelectorAll('#filterDropdown input');
const gallery = document.querySelector('.gallery');

checkboxes.forEach((checkbox) => {
  checkbox.checked = true
  matchFilter();

  checkbox.addEventListener('change', () => {
    selectAll(checkbox);
    matchFilter();
  });
});

function getWEBP(link) {
  var filename = link.substring(link.lastIndexOf('/'), link.lastIndexOf('.'));
  if (link.includes('VideoLibrary') || link.includes('.gif')) {
    return 'ImageThumbnail'+filename+'.gif';
  }
  return 'ImageThumbnail'+filename+'.webp'

}

function selectAll(checkbox) {
  if (checkbox.name == 'everything') {
    if (checkbox.checked == true) {
      checkboxes.forEach(checkbox => {
      checkbox.checked = true
    });
    } else {
      checkboxes.forEach(checkbox => {
      checkbox.checked = false
    });
    }
  } else if (document.querySelectorAll("#filterDropdown input[type='checkbox']:checked").length == checkboxes.length - 1) {
    if (checkbox.checked == true) {
      checkboxes.forEach(checkbox => {
      checkbox.checked = true
    });
  } else {
      document.querySelector('#everything').checked = false
  }
  }
}

function getSelector(checkedBoxes) {
  var selector = ""
  var checkedIds = Array.from(checkedBoxes).map(checkbox => checkbox.id);
  for (var i=0; i<checkedIds.length; i++) {
    if (checkedIds.at(i) == 'everything') {
      continue;
    }
    selector = selector + '.' + checkedIds.at(i)
    if (i != checkedIds.length - 1) {
      selector = selector + ', '
    }
  }
  return selector;
}

function getFilterSummary(checkedBoxes) {
  var text = 'Filters: '
  if (checkedBoxes.length == 0) {
      return 'Filters: none';
  } else if (checkedBoxes.item(0).name == 'everything') {
      text = text + ' everything'
      return text;
  }
  for (var i=0; i<checkedBoxes.length; i++) {
    text = text + checkedBoxes.item(i).name;
    if (i!=checkedBoxes.length - 1) {
      text = text + ', '
    }
  }
  console.log(text);
  return text;
}

function matchFilter() {
  const checkedBoxes = document.querySelectorAll("#filterDropdown input[type='checkbox']:checked");
  
   document.querySelector('summary').textContent = getFilterSummary(checkedBoxes)

  gallery.replaceChildren();
  if (getSelector(checkedBoxes) == '') {
    return;
  }
  document.querySelector('.imageList').querySelectorAll(getSelector(checkedBoxes)).forEach(item => {

    const new_item = document.createElement('div');
    const new_image = document.createElement('img');
    new_item.classList.add('grid-item');
    new_image.src = getWEBP(item.firstChild.src);

    gallery.appendChild(new_item);
    new_item.appendChild(new_image);
    // add lightbox
    new_item.addEventListener('click', () => activateLightBox(new_item, item.firstChild.tagName, item.firstChild.src));


  });
  
  gridItems = document.querySelectorAll('.grid-item');
  waitForImages();
  intersectionObserve();

}

function activateLightBox(self, ogTag, ogLink) {
  if (self.tagName == 'IMG') {self.loading = 'lazy';}

  lightbox.classList.add('active');
  const img = document.createElement(ogTag);
  if (ogTag == 'VIDEO') {
            img.autoplay = true;
            img.controls = true;
            img.loop = true;
  }
  img.src = ogLink
  img.loading = 'eager'

  lightbox.appendChild(img);

};