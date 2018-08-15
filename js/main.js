// sections
// slow:[0,48]
// medium:[48,96]
// fast:[96,144]
// a>b:[144,192],[192,240]
// a>c:[240,288],[288,336]
// b>a:[336,384],[384,432]
// b>c:[432,480],[480,528]
// c>a:[528,576],[576,624]
// c>b:[624,672],[672,720]

const animData = {
  container: document.getElementById('cycle'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'data/data.json'
};

const anim = bodymovin.loadAnimation(animData);
const btnSlow = document.getElementById('slow');
const btnMedium = document.getElementById('medium');
const btnFast = document.getElementById('fast');

let currentState = 'A';


anim.addEventListener('DOMLoaded', function(e) {
  anim.playSegments([0,48], true);
  currentState = 'A';
  console.log(currentState)
});

// When the animation is loaded run our firstLoop function
anim.addEventListener('DOMLoaded',loopA);

// Create our playback functions for our 3 speeds
function loopA() {
  anim.playSegments([0,48], true);
  currentState = 'A';
  console.log(currentState)
};
function loopB() {
  anim.playSegments([48,96], true);
  currentState = 'B';
  console.log(currentState)
};
function loopC() {
  anim.playSegments([96,144], true);
  currentState = 'C';
  console.log(currentState)
};

// Transitions
function transitionAB() {
  anim.playSegments([144,192], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopB );
};
function transitionAC() {
  anim.playSegments([240,288], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopC );
};
function transitionBA() {
  anim.playSegments([336,384], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopA );
};
function transitionBC() {
  anim.playSegments([432,480], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopC );
};
function transitionCA() {
  anim.playSegments([528,576], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopA );
};
function transitionCB() {
  anim.playSegments([624,672], true);
  anim.removeEventListener('loopComplete');
  anim.addEventListener('loopComplete', loopB );
};

if (currentState === 'A') {
  btnMedium.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionAB );
  })
  btnFast.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionAC );
  })
} else if (currentState === 'B') {
  btnSlow.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionBA );
  })
  btnFast.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionBC );
  })
} else if (currentState === 'C') {
  btnSlow.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionCA );
  })
  btnMedium.addEventListener('click', function(event) {
    anim.addEventListener('loopComplete', transitionCB );
  })
} else {
  console.log('wank')
}
