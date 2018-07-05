<template>
    <nav class="mortgage-navbar">
        <p>
            <router-link to="/">Mortgage Calculator</router-link>
        </p>
        <p>
            <router-link to="/mortgage-finance-calculator">Mortgage Finance Calculator</router-link>
        </p>
        <p>
            <router-link to="/mortgage-payment-calculator">Mortgage Payment Calculator</router-link>
        </p>
    </nav>
</template>

<style>
p {
    font-size: 18px;
    padding: 5px;
}

.mortgage-navbar {
    display: flex;
    padding: 0 340px;
}
</style>
