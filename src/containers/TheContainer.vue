<template>
  <div class="c-app">

    <!-- ***** Preloader Start ***** -->
    <Transition>
      <div id="preloader" v-if="showLoader">
        <div class="jumper">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Transition>
    <!-- ***** Preloader End ***** -->

    <NavHeader/>

    <div class="page-heading" id="top">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="inner-content">
              <h2>Check Our Products</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";

export default {
  name: 'TheContainer',
  components: {
    NavHeader
  },
  data() {
    return {
      showLoader: true
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.showLoader = false
    }, 1000)
  }
}
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/templatemo-hexashop.css";
@import "../assets/css/owl-carousel.css";
@import "../assets/css/lightbox.css";
@import "../assets/css/custom.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
