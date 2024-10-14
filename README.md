Silly approximation of a cloud that you'll see in this app (run the app, the clouds are MUCH better)

<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1d68aa; stop-opacity:1" />
      <stop offset="50%" style="stop-color:#478bbe; stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a1cae0; stop-opacity:1" />
    </linearGradient>
    <filter id="backFilter" width="500" height="275">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurGraphic" />
      <feTurbulence baseFrequency="0.012" numOctaves="5" seed="7" result="turbulence" />
      <feDisplacementMap
        in2="turbulence"
        in="blurGraphic"
        scale="154.2521765081733"
        xChannelSelector="R"
        yChannelSelector="G" />
    </filter>
    <filter id="midFilter" width="500" height="275">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurGraphic" />
      <feTurbulence baseFrequency="0.012" numOctaves="5" seed="7" result="turbulence" />
      <feDisplacementMap
        in2="turbulence"
        in="blurGraphic"
        scale="134.2521765081733"
        xChannelSelector="R"
        yChannelSelector="G" />
    </filter>
    <filter id="frontFilter" width="500" height="275">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blurGraphic" />
      <feTurbulence baseFrequency="0.012" numOctaves="5" seed="7" result="turbulence" />
      <feDisplacementMap
        in2="turbulence"
        in="blurGraphic"
        scale="114.2521765081733"
        xChannelSelector="R"
        yChannelSelector="G" />
    </filter>
    <linearGradient id="backGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color: rgba(255, 255, 255, 0.9);" />
        <stop offset="80%" style="stop-color: rgba(255, 255, 255, 0.9);" />
        <stop offset="95%" style="stop-color: rgba(255, 255, 255, 0);" />
    </linearGradient>
    <linearGradient id="midGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: rgba(158,168,179, 0.0);" />
        <stop offset="30%" style="stop-color: rgba(158,168,179, 0.0);" />
        <stop offset="40%" style="stop-color: rgba(158,168,179, 0.0);" />
        <stop offset="60%" style="stop-color: rgba(158,168,179, 0.1);" />
        <!--stop offset="70%" style="stop-color: rgba(158,168,179, 0.5);" /-->
        <stop offset="90%" style="stop-color: rgba(158,168,179, 0);" />
    </linearGradient>
    <linearGradient id="frontGradient" x1="0%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" style="stop-color: rgba(0,0,0, 0);" />
        <stop offset="50%" style="stop-color: rgba(0,0,0, 0);" />
        <stop offset="70%" style="stop-color: rgba(0,0,0, 0.1);" />
        <stop offset="80%" style="stop-color: rgba(0,0,0, 0);" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#sky)" />
  <g id="cloud">
    <ellipse cx="200" cy="200" rx="125" ry="69" fill="url(#backGradient)" filter="url(#backFilter)">
      <animate
        attributeName="cx"
         values="200;300;200"
         dur="40s"
         repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="200" cy="210" rx="125" ry="40" fill="url(#midGradient)" filter="url(#midFilter)" >
      <animate
        attributeName="cx"
         values="200;300;200"
         dur="40s"
         repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="200" cy="220" rx="125" ry="69" fill="url(#frontGradient)" filter="url(#frontFilter)">
      <animate
        attributeName="cx"
         values="200;300;200"
         dur="40s"
         repeatCount="indefinite" />
    </ellipse>
    <animateTransform attributeName="transform" attributeType="XML" dur="20s" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" repeatCount="indefinite" type="translate" from="0" to="220" fill="freeze" values="0;200;0" calcMode="spline"></animateTransform>
  </g>
</svg>