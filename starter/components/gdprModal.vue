<template>
  
  <div
        class="modal upm-gdprModal"
        :class="{ 'is-active': showModal }"
    >

      <div class="modal-card">

          <section class="modal-card-body">

              <h3 class="is-size-6 has-margin-bottom-50">We use cookies</h3>

              <p class="is-size-7 has-text-grey">Our website uses cookies, to enable essential services and functionality on our site and to collect data on how visitors interact with our site, products and services. By clicking accept you agree to our use of these tools for advertising and analytics and consent to our <a :href="`${url}`">cookie policy</a>.</p>

              <div
                  v-if="isOpen" 
                  class="columns is-multiline has-items-stretch has-margin-top-100"
              >

                  <div class="column is-6">

                      <div class="box has-background-white-bis is-full-height">

                          <b-switch
                              v-model="toggleAnayltics"
                              :true-value="true"
                              :false-value="false"
                              type="is-primary"
                          >Analytics</b-switch>

                          <p class="is-size-7 has-text-grey has-margin-top-100">So we can better understand how people use our site.</p>

                      </div>
                  
                  </div>

                  <div class="column is-6">

                      <div class="box has-background-white-bis is-full-height">

                          <b-switch
                              v-model="toggleMarketing"
                              :true-value="true"
                              :false-value="false"
                              type="is-primary"
                          >Marketing</b-switch>

                          <p class="is-size-7 has-text-grey has-margin-top-100">So we can tailor your offers and shopping experience.</p>

                      </div>
                  
                  </div>

                  <div class="column is-6">

                      <div class="box has-background-white-bis is-full-height">

                          <b-switch
                              v-model="toggleFunctional"
                              :true-value="true"
                              :false-value="false"
                              type="is-primary"
                              disabled
                          >Functional</b-switch>

                          <p class="is-size-7 has-text-grey has-margin-top-100">So our site can function properly.</p>

                      </div>

                  </div>

              </div>

              <div class="columns is-vcentered has-margin-top-50">

                  <div class="column">

                      <a
                          href="javascript:void(0)"
                          @click="isOpen = !isOpen"
                      >
                      
                          <span class="is-size-7">Preferences</span>
                          
                      </a>

                  </div>

                  <div class="column">

                      <div class="buttons is-right">

                          <button
                              class="button is-primary is-fullwidth-mobile"
                              @click="accept(expiryDate, $event)"
                          >
                          
                              <span class="is-size-7">OK</span>
                          
                          </button>

                      </div>

                  </div>

              </div>

          </section>

      </div>

  </div>

</template>
<script>
import split from "lodash/split";
export default {
  name: "GDPRComponent",
  props: {
    expiryDate: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cookie: "",
      showModal: false,
      isOpen: false,
      toggleAnayltics: "",
      toggleMarketing: "",
      toggleFunctional: ""
    };
  },
  created() {
    this.cookieCheck();
  },
  mounted() {
    this.$bus.$on("OPEN_GDPR_MODAL", () => {
      this.cookieCheck(true);
    });
  },
  methods: {
    cookieCheck(manualTrigger = false) {
      this.getCookie("upm-gdprSettings");
      this.toggleAnayltics = this.getAnaylticsValue();
      this.toggleMarketing = this.getMarketingValue();
      this.toggleFunctional = this.getFunctionalValue();
      this.showModal = this.cookie == "" || manualTrigger ? true : false;
    },
    returnToggleValue(initValue, arrayIndex) {
      let value = initValue;
      if (this.cookie != "") {
        value = split(this.cookie, "|");
        value = value[arrayIndex];
      }
      return value;
    },
    getAnaylticsValue() {
      return this.returnToggleValue(true, 1);
    },
    getMarketingValue() {
      return this.returnToggleValue(true, 2);
    },
    getFunctionalValue() {
      return this.returnToggleValue(true, 3);
    },
    accept(expiryDate, e) {
      e.preventDefault();
      this.setCookie(expiryDate);
      this.isOpen = false;
      this.showModal = false;
    },
    setCookie(exp) {
      const cookieValues =
        this.toggleAnayltics +
        "|" +
        this.toggleMarketing +
        "|" +
        this.toggleFunctional;
      const cname = "upm-gdprSettings",
        cookieObj = exp + "|" + cookieValues,
        expiry = new Date(exp * 1000).toUTCString();
      document.cookie =
        cname + "=" + cookieObj + ";expires=" + expiry + ";path=/";
    },
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      this.cookie =
        parts.length == 2
          ? parts
              .pop()
              .split(";")
              .shift()
          : "";
    }
  }
};
</script>