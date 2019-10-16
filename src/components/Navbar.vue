<template>
    <nav class="mortgage-navbar">
        <el-row>
            <el-col>

            </el-col>
        </el-row>
        <div class="topnav">
            <p>
                <router-link to="/">Mortgage Calculator</router-link>
            </p>
            <p>
                <router-link to="/mortgage-finance-calculator">Mortgage Finance Calculator</router-link>
            </p>
            <p>
                <router-link to="/mortgage-payment-calculator">Mortgage Payment Calculator</router-link>
            </p>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    p {
        font-size: 18px;
        padding: 5px;
    }

    .mortgage-navbar {
        display: flex;
        justify-content: center;
    }

    @media (max-width: 730px) {
        .mortgage-navbar {
            display: inline-block;
        }
    }

    //for nav bar
    .topnav {
        padding: 0px 85px 0px 48px;
        background-color: #99ca80;
        overflow: hidden;
    }

    /* Style the links inside the navigation bar */
    .topnav p {
        float: left;
        color: #f2f2f2;
        text-align: center;
        text-decoration: none;
        font-size: 17px;
    }

    /* Change the color of links on hover */
    .topnav p:hover {
        background-color: #ddd;
        color: black;
    }

    /* Add a color to the active/current link */
    .topnav p.active {
        background-color: #4CAF50;
        color: white;
    }
</style>
