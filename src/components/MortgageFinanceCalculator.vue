<template>
    <div class="mortgage_finance_calc">
        <h1>Mortgage Finance Calculator</h1>
        <el-row :gutter="12">
            <el-col :span="12">
                <label>Current monthly payment</label>
                <el-input type="number" placeholder="Current monthly payment" v-model="current_monthly_payment"></el-input>
            </el-col>
            <el-col :span="12">
                <label>Current loan interest rate</label>
                <el-input type="number" placeholder="Current loan interest rate"  v-model="current_loan_interest_rate"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="12">
                <label>Balance left on mortgage</label>
                <el-input type="number" placeholder="Balance left on mortgage" v-model="balance"></el-input>
            </el-col>
            <el-col :span="12">
                <label>New interest rate</label>
                <el-input type="number" placeholder="New interest rate" v-model="new_interest_rate"></el-input>
            </el-col>
        </el-row>
         <el-row :gutter="12">
            <el-col :span="12">
                <label>Remaining loan term</label>
                <el-input type="number" placeholder="Remaining loan term" v-model="remaining_loan_term"></el-input>
                <!-- <el-input id="roamingLoanItemText" value="years" disabled></el-input> -->
            </el-col>
            <el-col :span="12">
                <label>New loan term</label>
                <el-input type="number" placeholder="New interest rate" v-model="new_loan_term"></el-input>
            </el-col>
        </el-row>

        <div> 
            <p><strong>How much will it cost you?</strong></p>
        </div>

        <!-- Fees Section -->

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Points</label>
                <el-input type="number" placeholder="Points" v-model="points"></el-input>
            </el-col>
            <el-col :span="12">
                <p>Costs of points: {{ pointsResult }}</p>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Application fee</label>
                <el-input type="number" placeholder="Application fee" v-model="application_fee"></el-input>
            </el-col>
             <el-col :span="12">
                <label>Credit check</label>
                <el-input placeholder="Credit check" v-model="credit_check"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Attorney's fee (yours)</label>
                <el-input type="number" placeholder="Attorney's fee (yours)" v-model="attorney_fee_yours"></el-input>
            </el-col>
            <el-col :span="12">
                <label>Attorney's fee (lenders)</label>
                <el-input type="number" placeholder="Attorney's fee (lenders)" v-model="attorney_fee_lenders"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Title search</label>
                <el-input type="number" placeholder="Title search" v-model="title_search"></el-input>
            </el-col>
            <el-col :span="12">
                <label>Title insurance</label>
                <el-input type="number" placeholder="Title insurance" v-model="title_insurance"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Appraisal fee</label>
                <el-input type="number" placeholder="Appraisal fee" v-model="appraisal_fee"></el-input>
            </el-col>
            <el-col :span="12">
                <label>Inspections</label>
                <el-input type="number" placeholder="Inspections" v-model="inspections"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Local fees (taxes, transfers)</label>
                <el-input type="number" placeholder="Local fees (taxes, transfers)" v-model="local_fees"></el-input>
            </el-col>
            <el-col :span="12">
                <label>Document preparation</label>
                <el-input type="number" placeholder="Document preparation" v-model="document_preparation"></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Other</label>
                <el-input type="number" placeholder="Other" v-model="other"></el-input>
            </el-col>
        </el-row>

        <!-- End Fees Section -->

        <!-- All Cost Section -->
        <div class="costs_section">
            <p>New Monthly Pament</p>
            <h1><span>$</span>{{ monthly_payment.toFixed(2) }}</h1>
            <p>Monthly Savings: ${{ monthly_savings.toFixed(2) }}</p>
            <p>Difference in Interest: ${{ diff_in_interest }}</p>
            <p>Total cost: ${{ total_cost.toFixed(2) }}</p>
            <p>Months to recoup costs: ${{ months_rec_costs.toFixed(2) }}</p>
        </div>
        <!-- End Cost Section -->
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
            new_loan_term_upd: 0,
            monthly_savings: 0,
            diff_in_interest: 0,
            points: 0,
            pointsResult: 0,
            application_fee: 0,
            credit_check: 0,
            attorney_fee_yours: 0,
            attorney_fee_lenders: 0,
            title_search: 0,
            title_insurance: 0,
            appraisal_fee: 0,
            local_fees: 0,
            inspections: 0,
            document_preparation: 0,
            other: 0
        }
    },
    watch: {

        current_monthly_payment() {

            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 && this.current_monthly_payment != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );
                this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );
            
            }

        },

        balance() {

            if( this.balance == 0 ) {

                this.monthly_payment = 0;
                this.pointsResult = 0;
                this.total_cost = 0;

            }

            if( this.new_loan_term == 0 && this.new_interest_rate_upd == 0 ) {
                
                this.monthly_payment = 0;

            }

            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 && this.current_monthly_payment != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );
                this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );
            
            }

            if( this.points != 0 ) {

                let balancePoints = parseFloat(( this.balance ) / 100);
                this.pointsResult = (balancePoints * this.points);
                this.total_cost = this.pointsResult;

            }

        },

        new_interest_rate() {
                
            this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);
            
            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 && this.current_monthly_payment != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );
                this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );

            }

        },

        new_loan_term() {

            this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;

            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term != 0 && this.current_monthly_payment != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );
                this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );

            }

        },

        points() {

            if( this.points != 0 ) {

                let balancePoints = parseFloat(( this.balance ) / 100);
                this.pointsResult = (balancePoints * this.points);
                this.total_cost = this.pointsResult;

            }

            if( this.points == 0 ) {

                this.pointsResult = 0;
                this.total_cost = 0;

            }

        }

    },
    computed: {

        total_cost: {

           get: function() {

                if( this.pointsResult != 0 ) {

                   return this.pointsResult + 
                              parseInt( this.application_fee ) + 
                              parseInt( this.credit_check ) +
                              parseInt( this.attorney_fee_yours ) +
                              parseInt( this.attorney_fee_lenders ) +
                              parseInt( this.title_search ) +
                              parseInt( this.title_insurance ) + 
                              parseInt( this.appraisal_fee ) + 
                              parseInt( this.inspections ) +
                              parseInt( this.local_fees ) +
                              parseInt( this.document_preparation )
                              parseInt( this.other );

                } else {

                    return 0;
                
                }
            
            },

            set: function(newValue) {}

        },

        months_rec_costs: {

            get: function() {
             
                if( this.balance != 0 && this.monthly_savings != 0 ) {

                    return parseFloat(( this.balance ) / ( this.monthly_savings * 100));

                } else {
                    return 0;
                }

            },

            set: function(newValue) {}

        }

    }
}
</script>


<style>
.el-col {
    padding: 10px;
}

.mortgage_finance_calc {
    width: 50%;
    background-color: #F0F0F2;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #CFCFD4;
}

.mortgage_finance_calc h1:nth-child(1) {
    text-align: center;
}

#roamingLoanItemText {
     -webkit-appearance:none!important;
    color:green;
    text-align:left;
    width:75px;
    border:1px solid gray;
    border-left:0px;
    margin:0 0 0 -7px;
    background:white;
}

#roamingLoanItem {
    -webkit-appearance:none!important;
    border:1px solid gray;
    border-right:0px;
    outline:none;
}
</style>
