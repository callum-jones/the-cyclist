// sections
// slow:[0,48]
// medium:[48,96]
// fast:[96,144]
// a>b:[144,192]
// a>c:[192,240]
// b>a:[240,288]
// b>c:[288,336]
// c>a:[336,384]
// c>b:[384,432]

(function () {
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
  const loadingClass = 'loading';

  let currentState;

  anim.addEventListener('DOMLoaded', function(e) {
    anim.playSegments([0,48], true);
    currentState = 'A';
    console.log(currentState)
  });

  // When the animation is loaded run our firstLoop function
  anim.addEventListener('DOMLoaded',loopA);
  document.documentElement.classList.remove(loadingClass);

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
    anim.playSegments([192,240], true);
    anim.removeEventListener('loopComplete');
    anim.addEventListener('loopComplete', loopC );
  };
  function transitionBA() {
    anim.playSegments([240,288], true);
    anim.removeEventListener('loopComplete');
    anim.addEventListener('loopComplete', loopA );
  };
  function transitionBC() {
    anim.playSegments([288,336], true);
    anim.removeEventListener('loopComplete');
    anim.addEventListener('loopComplete', loopC );
  };
  function transitionCA() {
    anim.playSegments([336,384], true);
    anim.removeEventListener('loopComplete');
    anim.addEventListener('loopComplete', loopA );
  };
  function transitionCB() {
    anim.playSegments([384,432], true);
    anim.removeEventListener('loopComplete');
    anim.addEventListener('loopComplete', loopB );
  };

  btnSlow.addEventListener('click', function(event) {
    this.classList.add('active');
    if (currentState === 'B') {
      btnMedium.classList.remove('active');
      anim.addEventListener('loopComplete', transitionBA );
    } else if (currentState === 'C') {
      btnFast.classList.remove('active');
      anim.addEventListener('loopComplete', transitionCA );
    } else {
      console.log('A is current')
    }
  })

  btnMedium.addEventListener('click', function(event) {
    this.classList.add('active');
    if (currentState === 'A') {
      btnSlow.classList.remove('active');
      anim.addEventListener('loopComplete', transitionAB );
    } else if (currentState === 'C') {
      btnFast.classList.remove('active');
      anim.addEventListener('loopComplete', transitionCB );
    } else {
      console.log('B is current')
    }
  })

  btnFast.addEventListener('click', function(event) {
    this.classList.add('active');
    if (currentState === 'A') {
      btnSlow.classList.remove('active');
      anim.addEventListener('loopComplete', transitionAC );
    } else if (currentState === 'B') {
      btnMedium.classList.remove('active');
      anim.addEventListener('loopComplete', transitionBC );
    } else {
      console.log('C is current')
    }
  })

})();
