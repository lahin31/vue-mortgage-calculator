<template>
    <div>
        <h1>Mortgage Finance Calculator</h1>
        <el-row :gutter="12">
            <el-col :span="4">
                <label>Current monthly payment</label>
                <el-input placeholder="Current monthly payment" v-model="current_monthly_payment"></el-input>
            </el-col>
            <el-col :span="4">
                <label>Current loan interest rate</label>
                <el-input placeholder="Current loan interest rate"  v-model="current_loan_interest_rate"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="4">
                <label>Balance left on mortgage</label>
                <el-input placeholder="Balance left on mortgage" v-model="balance"></el-input>
            </el-col>
            <el-col :span="4">
                <label>New interest rate</label>
                <el-input placeholder="New interest rate" v-model="new_interest_rate"></el-input>
            </el-col>
        </el-row>
         <el-row :gutter="12">
            <el-col :span="4">
                <label>Remaining loan term</label>
                <el-input placeholder="Remaining loan term" v-model="remaining_loan_term"></el-input>
            </el-col>
            <el-col :span="4">
                <label>New loan term</label>
                <el-input placeholder="New interest rate" v-model="new_loan_term"></el-input>
            </el-col>
        </el-row>
        <p>New Monthly Pament</p>
        <h1><span>$</span>{{ monthly_payment }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current_monthly_payment: 0,
            current_loan_interest_rate: 0,
            balance: 0,
            new_interest_rate: 0,
            remaining_loan_term: 0,
            new_loan_term: 0,
            monthly_payment: 0,
            new_interest_rate_upd: 0,
            new_loan_term_upd: 0
        }
    },
    watch: {

        balance() {

            console.log(this.balance);

            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );

            }


            if( this.new_loan_term == 0 && this.new_interest_rate_upd == 0 ) {
                
                this.monthly_payment = 0;

            }

        },

        new_interest_rate() {
                
            this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);
            
            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );

            }

        },

        new_loan_term() {

            this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;
            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );

            }

        }

    }
}
</script>


<style>
.el-col {
    padding: 10px;
}
</style>
