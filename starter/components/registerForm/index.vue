<template>

    <div>

        <article v-if="isSuccess" class="message is-success has-margin-top-100">
            <div class="message-body">
                Your organisation has been created. Please check your mailbox for a verification email and details on how to login.
            </div>
        </article>

        <div v-else>

            <article v-if="hasError" class="message is-danger">
                <div class="message-body">
                    There has been a problem, please try again.
                </div>
            </article>

            <form v-on:submit.prevent>

                <div class="field has-margin-bottom-150">

                    <div class="label">

                        <label class="label">Organisation Name<span class="has-text-danger">*</span></label>

                    </div>

                    <p class="control has-icons-left">

                        <input v-model="organisation" :data-fieldState="field_error_states.orgname" class="input" type="organisation" aria-label="Organisation Name" placeholder="Organisation name" maxlength="200" name="organisation" required="true" value="">

                        <span class="icon is-small is-left">

                            <i class="fas fa-building"></i>
                            
                        </span>

                        <span v-if="field_error_states.orgname == 'state:0'" class="is-inline-block is-size-7 has-text-danger has-margin-top-50">{{ field_errors.orgname }}</span>

                    </p>

                </div>

                <div class="field has-margin-bottom-150">

                    <div class="label">

                        <label class="label">Your Name<span class="has-text-danger">*</span></label>

                    </div>

                    <p class="control has-icons-left">

                        <input v-model="name" :data-fieldState="field_error_states.name" class="input" type="name" aria-label="Your Name" placeholder="Your name" maxlength="200" name="name" required="true" value="">

                        <span class="icon is-small is-left">

                            <i class="fas fa-user"></i>
                            
                        </span>

                        <span v-if="field_error_states.name == 'state:0'" class="is-inline-block is-size-7 has-text-danger has-margin-top-50">{{ field_errors.name }}</span>

                    </p>

                </div>

                <div class="field has-margin-bottom-150">

                    <div class="label">

                        <label class="label">Your Email<span class="has-text-danger">*</span></label>

                    </div>

                    <p class="control has-icons-left">

                        <input v-model="email" :data-fieldState="field_error_states.email" class="input" type="email" aria-label="Your Email" placeholder="Your email" maxlength="200" name="email" required="true" value="">

                        <span class="icon is-small is-left">

                            <i class="fas fa-envelope"></i>
                            
                        </span>

                        <span v-if="field_error_states.email == 'state:0'" class="is-inline-block is-size-7 has-text-danger has-margin-top-50">{{ field_errors.email }}</span>

                    </p>

                </div>

                <div class="field has-margin-bottom-100">

                    <div class="label">

                        <label class="label">Your Password<span class="has-text-danger">*</span></label>

                    </div>

                    <p class="control has-icons-left">

                        <input v-model="password" :data-fieldState="field_error_states.password" class="input" type="password" aria-label="Your Password" placeholder="8+ characters, consisting of both numbers &amp; letters" minlength="8" maxlength="200" name="password" required="true" value="">

                        <span class="icon is-small is-left">

                            <i class="fas fa-key"></i>
                            
                        </span>

                        <span v-if="field_error_states.password == 'state:0'" class="is-inline-block is-size-7 has-text-danger has-margin-top-50">{{ field_errors.password }}</span>

                    </p>

                </div>

                <!-- Google reCAPTCHA -->
                <google-recaptcha-v3
                    ref="recaptcha"
                    v-model="recaptcha_token"
                    class="has-margin-bottom-100"
                    :action="'org_register'"
                />

                <div class="control has-text-centered">

                    <button @click="createAccount" class="button is-fullwidth-mobile is-medium is-primary">
                    
                        <span class="is-size-6">Continue</span>
                    
                    </button>

                </div>

            </form>

        </div>

    </div>

</template>
<script>
    import axios from "axios";
    import GoogleRecaptchaV3 from "./GoogleRecaptchaV3";
    import isEmpty from "lodash/isEmpty";
    import map from "lodash/map";
    import merge from "lodash/merge";
    import { getCookie } from "../../utils";
    export default {
        name: "RegisterFormComponent",
        components: {
            "google-recaptcha-v3": GoogleRecaptchaV3
        },
        props: {
            medium: {
                type: String,
                default: ''
            },
            source: {
                type: String,
                default: ''
            },
            campaign: {
                type: String,
                default: ''
            },
            term: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isProcessing: false,
                isSuccess: false,
                hasError: false,
                organisation: '',
                name: '',
                email: '',
                password: '',
                recaptcha_token: '',
                field_errors: {
                    orgname: 'Organisation name is not valid',
                    name: 'Name is not valid',
                    email: 'Email is not valid',
                    password: 'Password is not valid'
                },
                field_error_states: {
                    orgname: 'state:1',
                    name: 'state:1',
                    email: 'state:1',
                    password: 'state:1'
                },
                content: getCookie('upm-contentReferer')
            }
        },
        methods: {
            reset() {
                this.organisation = '';
                this.name = '';
                this.email = '';
                this.password = '';
                this.field_error_states = {
                    orgname: 'state:1',
                    name: 'state:1',
                    email: 'state:1',
                    password: 'state:1'
                }
            },
            createAccount() {
                this.isProcessing = true;
                this.hasError = false;
                let postObj = {
                    orgname: this.organisation,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    recaptcha_token: this.recaptcha_token
                }
                if(this.medium != '' || this.source != '' || this.campaign != '' || this.content != '' || this.term != ''){
                    postObj = merge(
                        postObj,
                        { 
                            tracking: {
                                medium: this.medium,
                                source: this.source,
                                campaign: this.campaign,
                                content: this.content,
                                term: this.term
                            }
                        }
                    );
                }
                return axios.post('https://api.upmind.io/api/org/register', postObj)
                .then(() => {
                    this.$refs.recaptcha.generateToken();
                    this.reset();
                    this.isSuccess = true;
                    this.isProcessing = false;
                })
                .catch(error => {
                    this.$refs.recaptcha.generateToken();
                    if (error.response) {
                        if(error.response.status == 422){
                            const errors = error.response.data.error.data;
                            map(errors, (field, index) => {
                                this.field_errors[index] = field[0];
                                this.field_error_states[index] = !isEmpty(errors[index]) ? 'state:0' : 'state:1';
                            });
                        }else{
                            this.hasError = true;
                        }
                    }else{
                        this.hasError = true;
                    }
                });
            }
        }
    }
</script>