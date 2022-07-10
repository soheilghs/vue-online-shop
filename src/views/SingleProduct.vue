<template>

  <div id="single-product-root">

    <!-- ***** Product Area Starts ***** -->
    <section class="section" id="product">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="left-images">
              <img :src="this.product.image" alt="">
            </div>
          </div>
          <div class="col-lg-4">
            <div class="right-content">
              <h4>{{ this.product.title }}</h4>
              <span class="price">${{ this.product.price }}</span>
              <ul class="stars">
                <li v-for="num in rate"
                    :key="num">
                  <i class="fa fa-star"></i>
                </li>
              </ul>
              <span>
                {{ this.product.category }}
              </span>
              <div class="quote">
                <i class="fa fa-quote-left"></i>
                <p>
                  {{ this.product.description }}
                </p>
              </div>
              <div class="quantity-content">
                <div class="left-content">
                  <h6>No. of Orders</h6>
                </div>
                <div class="right-content">
                  <div class="quantity buttons_added">
                    <input type="button" value="-"
                           @click="minusQuantity"
                           class="minus">
                    <input step="1" min="1" max="" v-model="quantity"
                           @keypress="isNumber($event)" title="Qty"
                           @keyup="fillQty"
                           class="input-text qty text">
                    <input type="button" value="+" class="plus"
                           @click="quantity++">
                  </div>
                </div>
              </div>
              <div class="total">
                <h4>
                  Total: ${{ totalPrice }}
                </h4>
                <div class="main-border-button">
                  <a @click="addToCart" class="cursor-p">
                    Add To Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Product Area Ends ***** -->

  </div>

</template>

<script>
import {baseUrl} from "@/config";

export default {
  name: "SingleProduct",
  data() {
    return {
      product: {},
      quantity: 1,
      price: 0,
      rate: 0
    }
  },
  methods: {
    isNumber: function (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    minusQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    fillQty() {
      if (this.quantity == '') {
        this.quantity = 1;
      }
    },
    addToCart() {
      let date = new Date();
      let dateString = date.toISOString().slice(0, 10);
      let data = JSON.stringify({
        userId: 1,
        date: dateString,
        products: [{
          productId: this.$route.params.id,
          quantity: this.quantity
        }]
      });

      this.$axios.post('/carts', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res);
        alert('Product was added to cart!');
      }).catch(() => {
      });
    }
  },
  mounted() {
    this.$axios.defaults.baseURL = baseUrl;
    this.$axios.get('/products/' + this.$route.params.id, null)
        .then((res) => {
          this.product = res.data;
          this.rate = parseInt(Math.round(this.product.rating.rate));
          this.price = this.product.price
        })
        .catch(() => {
        });
  },
  computed: {
    totalPrice() {
      return this.quantity * this.price;
    }
  }
}
</script>

<style scoped>

</style>