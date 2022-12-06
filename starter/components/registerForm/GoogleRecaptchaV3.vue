<template>
    <div>
        <p class="is-size-8 has-text-grey-light">
            By clicking 'Continue' I agree to Upmind's <a
                class="has-text-grey-light"
                href="https://docs.upmind.com/docs/terms-and-conditions"
                target="_blank"
            >
                <u>Terms &amp; conditions</u>
            </a>. This form is protected by reCAPTCHA and Google's
            <a
                class="has-text-grey-light"
                href="https://policies.google.com/privacy"
                target="_blank"
            >
                <u>Privacy policy</u>
            </a> and <a
                class="has-text-grey-light"
                href="https://policies.google.com/terms"
                target="_blank"
            >
                <u>Terms of service</u>
            </a> apply.
        </p>
    </div>
</template>

<script>
export default {
    name: "GoogleRecaptchaV3",
    props: {
        value: {
            type: String,
            default: ""
        },
        action: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            grecaptcha: window["grecaptcha"] || undefined,
            siteKey: '6Ld-YJsUAAAAALUP1JslLPZsc07ut-3OjWl6zGBL'
        }
    },
    created() {
        if (this.grecaptcha) this.generateToken();
    },
    mounted() {
        if (this.grecaptcha) return;
        const script = document.createElement("script");
        const src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
        script.setAttribute("src", src);
        document.head.appendChild(script);
        script.addEventListener("load", () => {
        window["grecaptcha"].ready(() => {
            this.grecaptcha = window["grecaptcha"];
            this.generateToken();
        });
        });
    },
    methods: {
        async generateToken() {
            if (!this.grecaptcha) return;
            const token = await this.grecaptcha.execute(this.siteKey, {
            action: this.action
            });
            this.$emit("input", token);
        }
    }
}
</script>

<style lang="scss">
.grecaptcha-badge {
    visibility: hidden;
}
</style>
