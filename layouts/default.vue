<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
  /* font */
  @font-face {
    font-family: 'poppins-light';
    src: url('../static/font/poppins/Poppins-Light.ttf');
  }
  @font-face {
    font-family: 'poppins-medium';
    src: url('../static/font/poppins/Poppins-Medium.ttf');
  }
  .pm {
    font-family: 'poppins-medium';
  }

  body {
    font-family: 'poppins-light';
  }
  a {
    color: #000000;
  }
  a:hover {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
  }
  a:hover img {
    opacity: 0.9;
  }
  /* tabs menu */
  .tabbable .nav-tabs {
    overflow-x: auto;
    overflow-y:hidden;
    flex-wrap: nowrap;
  }
  .tabbable .nav-tabs .nav-link {
    white-space: nowrap;
  }
  .m-nav-tabs .nav-item .nav-link{
    color: rgba(0, 0, 0, 0.9);
  }
  .m-nav-tabs .nav-item .nav-link.active {
    border-bottom: 3px solid #F19292;
    color: #F19292;
  }
  .m-nav-tabs.nav-tabs .nav-link {
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
  }
</style>
