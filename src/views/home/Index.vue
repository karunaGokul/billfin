<template>
    <div class="home-page d-flex">
        <div 
            class="sidebar border"
            :class="{
                'sidebar-small': sideBar,
                'sidebar-medium': !sideBar,
            }"
        >
            <div class="p-4 ps-7">
                <img src="@/assets/billfin.svg" alt="Logo" width="40"/>
            </div>

            <div class="mt-2">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link active" href="#">
                            <i class="fas fa-box p-4 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="mt-4">
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">CLIENT INFO</p>
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
                    <i class="fas fa-ellipsis-h"></i>
                </p>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-user-friends p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Clients</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-grip-lines p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Fee Schedules</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-tags p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Products</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-grip-lines-vertical p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Subscriptions</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-clock p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Timesheets</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="mt-4">
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">BILLNG & PAYMENTS</p>
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
                    <i class="fas fa-ellipsis-h"></i>
                </p>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-dollar-sign p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Fees</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-money-check-alt p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Invoices</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-tags p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Payments</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-chart-line p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Reports</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="mt-4">
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">ADMINSTRATION</p>
                <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
                    <i class="fas fa-ellipsis-h"></i>
                </p>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-cog p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Settings</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center nav-link" href="#">
                            <i class="fas fa-question p-3 ps-6 fs-7"></i>
                            <span class="fs-7 nav-link__name">Help</span>
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="w-100 vh-100 bg-light">
            <nav class="navbar border-bottom bg-white">
                <div class="row w-100 align-items-center">
                    <div class="col-lg-3">
                        <div class="d-flex align-items-center justify-content-center">
                            <button class="btn" @click="sideBar = !sideBar"><i class="fas fa-arrow-right"></i></button>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                    <div class="col-lg-5 mt-4">
                        <div class="alert alert-danger fs-8 text-center fw-bolder" role="alert">
                            <i class="fas fa-info-circle"></i> You only have 7 more day(s) in your trial. Ready to sign-up? Click <a href="">here</a> to get started
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <button type="button" class="btn btn-primary fs-7">Create New</button>
                    </div>
                    <div class="col-lg-2">
                        <button class="btn"><i class="fas fa-bell fs-3"></i></button>
                        <span class="me-3">Hi Zoe</span>
                        <img src="@/assets/User.png" alt="User Photo" />
                    </div>
                </div>
            </nav>

            <div class="bg-light">
                <p class="fw-bolder m-0 p-4 pb-0 fs-5 text-dark fw-bold">Dashboard</p>
                <ol class="breadcrumb ps-4 pb-4">
                    <li class="breadcrumb-item"><a href="#" class="text-muted">Home</a></li>
                    <li class="breadcrumb-item"><a href="#" class="text-dark fw-bold">Dashboard</a></li>
                </ol>
            </div>

            <router-view></router-view>
        </div>
        <Welcome 
            v-if="showWelcomeMessage"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import Welcome from './components/welcome.vue';

@Options({
    components: {
        Welcome
    }
})
export default class Home extends Vue {

    public showWelcomeMessage: boolean = false;
    public sideBar:boolean = false;

    mounted() {
        setTimeout(() => {
            this.showWelcomeMessage = true;
        }, 1000)
    }
}
</script>