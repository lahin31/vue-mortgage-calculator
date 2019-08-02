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

<style scoped>
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
</style>
