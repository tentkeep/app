<template>
  <div class="p2">
    <form @submit.prevent="saveEntry" class="v-fill flex-column">
      <label for="shopName" class="primary font-2">*Etsy shop name:</label>
      <input
        name="shopName"
        type="text"
        v-model="shopName"
        class="input m1-top m2-bottom"
        placeholder="shop name"
        @input="search" />

      <transition name="fade-in">
      <div v-if="searchResults" class="scrolly border-primary shadow-primary3 m1-h">
        <p v-if="searchResults.length === 0">No shops found</p>
        <div v-for="shop in searchResults"
          :key="shop.shop_id"
          class="shop-result"
          :class="{ selected: selectedShop === shop }"
          @click="shopSelected(shop)"
        >
          <img :src="shop.icon_url_fullxfull" class="shop-image" />
          <div class="shop-description">
            <p class="primary">{{ shop.shop_name }}</p>
            <p class="muted font-2">{{ shop.title }}</p>
          </div>
        </div>
      </div>
      </transition>

      <button class="button add-button" :disabled="!shopId">Add</button>
    </form>

  </div>
</template>

<script>
import api from '@/js/api'

export default {
  name: 'AddPodcast',
  data () {
    return {
      shopName: null,
      shopId: null,
      searchResults: null,
      selectedShop: null,
      typeAheadTimer: null
    }
  },
  methods: {
    search () {
      if (this.shopName.length > 2) {
        clearTimeout(this.typeAheadTimer)
        this.typeAheadTimer = setTimeout(() => {
          api.searchEtsyShops(this.shopName)
            .then(r => { this.searchResults = r.results })
        }, 700)
      }
    },
    shopSelected (shop) {
      this.shopId = shop.shop_id
      this.selectedshop = shop
    },
    saveEntry () {
      this.$emit('submit', { entryType: 'etsy', details: { shopId: this.shopId } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.add-button {
  @extend .m3-top;
}

$row-height: 46px;

.shop-result {
  @extend .flex-row;
  @extend .align-center;
  @extend .m1-bottom;
  @extend .p1-bottom;
  @extend .relative;
  @extend .border-bottom-muted3;
  transition: background .3s;
  &.selected {
    @extend .bg-muted3;
  }
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
}
.shop-image {
  @extend .square;
  width: $row-height;
  min-width: $row-height;
}
.shop-description {
  @extend .m1-left;
  @extend .noscroll;
  max-height: $row-height;
}
</style>
