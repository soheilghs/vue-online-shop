<template>

  <div id="dashboard-root">

    <section class="section" id="products">

      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Our Latest Products</h2>
              <span>Check out all of our products.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container">

        <div class="row">

          <div class="col-lg-4" v-for="item in products" :key="item.id">
            <div class="item">
              <div class="thumb">
                <div class="hover-content">
                  <ul>
                    <li>
                      <a @click="showProduct(item.id)"
                         class="cursor-p">
                        <i class="fa fa-eye"></i>
                      </a>
                    </li>
                    <li>
                      <a class="cursor-p">
                        <i class="fa fa-star"></i>
                      </a>
                    </li>
                    <li>
                      <a class="cursor-p" @click="addToCart(item.id)">
                        <i class="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <img :src="item.image" :alt="item.title">

              </div>
              <div class="down-content">
                <h4>{{ item.title }}</h4>
                <span>${{ item.price }}</span>
                <ul class="stars">
                  <li v-for="num in parseInt(Math.round(item.rating.rate))"
                      :key="num">
                    <i class="fa fa-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="pagination">
              <ul>
                <li v-for="pageNum in pageNumbers"
                    :class="pageNum == page ? 'active' : ''"
                    :key="pageNum">
                  <a @click="goToPage(pageNum)" class="pagination-item">
                    {{ pageNum }}
                  </a>
                </li>
                <li>
                  <a @click="goToPage(page + 1)"
                     class="pagination-item">
                    >
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </section>

  </div>

</template>

<script>

import {baseUrl} from "@/config";

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      cursor: 1,
      page: 1,
      pageNumbers: 0,
      products: [],
      allProducts: [],
    }
  },
  methods: {
    showProduct(id) {
      this.$router.push({
        name: 'Product',
        params: {id: id}
      });
    },
    goToPage(num) {
      if ((this.page == num) || (num > this.pageNumbers)) {
        return;
      }
      let start = (num - 1) * 9;
      this.products = this.allProducts.slice(start, start + 9);
      this.page = num;
    },
    addToCart(id) {
      let date = new Date();
      let dateString = date.toISOString().slice(0, 10);
      let data = JSON.stringify({
        userId: 1,
        date: dateString,
        products: [{
          productId: id,
          quantity: 1
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
    this.$axios.get('/products', null)
        .then((res) => {
          this.allProducts = res.data;
          let count = this.allProducts.length;
          this.pageNumbers = parseInt(Math.ceil(count / 9));
          let start = (this.page - 1) * 9;
          this.products = this.allProducts.slice(start, start + 9);
        })
        .catch(() => {
        });
  }
}
</script>
