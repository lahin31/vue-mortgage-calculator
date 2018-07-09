<template>
    <div class="mortgage_finance_calc">
        <h1>Mortgage Finance Calculator</h1>
        <el-row :gutter="12">
            <el-col :span="12">
                <label>Current monthly payment</label>
                <el-input type="number" min=0 
                                placeholder="Current monthly payment" 
                                v-model="current_monthly_payment"
                                name="current_monthly_payment"
                                id="current_monthly_payment"
                                v-validate="'required'"
                                :class="{'error': errors.has('current_monthly_payment') }"></el-input>
                <span v-if="errors.has('current_monthly_payment')" style="color: red;">
                    Current monthly payment field is required
                </span>
            </el-col>
            <el-col :span="12">
                <label>Current loan interest rate</label>
                <el-input type="number" min=0 
                                placeholder="Current loan interest rate"  
                                v-model="current_loan_interest_rate"
                                name="current_loan_interest_rate"
                                id="current_loan_interest_rate"
                                v-validate="'required'"
                                :class="{'error': errors.has('current_loan_interest_rate') }"></el-input>
                <span v-if="errors.has('current_loan_interest_rate')" style="color: red;">
                    Current loan interest rate field is required
                </span>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="12">
                <label>Balance left on mortgage</label>
                <el-input type="number" min=0 
                                placeholder="Balance left on mortgage" 
                                name="balance"
                                id="balance"
                                v-model="balance"
                                v-validate="'required'"
                                :class="{'error': errors.has('balance') }"></el-input>
                <span v-if="errors.has('balance')" style="color: red;">
                    Balance field is required
                </span>
            </el-col>
            <el-col :span="12">
                <label>New interest rate</label>
                <el-input type="number" min=0 
                                placeholder="New interest rate" 
                                name="new_interest_rate"
                                id="new_interest_rate"
                                v-model="new_interest_rate"
                                v-validate="'required'"
                                :class="{'error': errors.has('new_interest_rate') }"></el-input>
                <span v-if="errors.has('new_interest_rate')" style="color: red;">
                    New interest rate field is required
                </span>
            </el-col>
        </el-row>
         <el-row :gutter="12">
            <el-col :span="12">
                <label>Remaining loan term</label>
                <el-input type="number" min=0 
                                placeholder="Remaining loan term" 
                                name="remaining_loan_term"
                                id="remaining_loan_term"
                                v-model="remaining_loan_term"
                                v-validate="'required'"
                                :class="{'error': errors.has('remaining_loan_term') }"></el-input>
                <span v-if="errors.has('remaining_loan_term')" style="color: red;">
                    Remaining loan term field is required
                </span>
            </el-col>
            <el-col :span="12">
                <label>New loan term</label>
                <el-input type="number" min=0 
                                placeholder="New loan term" 
                                name="new_loan_term"
                                id="new_loan_term"
                                v-model="new_loan_term"
                                v-validate="'required'"
                                :class="{'error': errors.has('new_loan_term') }"></el-input>
                <span v-if="errors.has('new_loan_term')" style="color: red;">
                    New loan term field is required
                </span>
            </el-col>
        </el-row>

        <div> 
            <p><strong>How much will it cost you?</strong></p>
        </div>

        <!-- Fees Section -->

        <el-row :gutter="12">

            <el-col :span="12">
                <label>Points</label>
                <el-input type="number" placeholder="Points" 
                                v-model="points" 
                                name="points"
                                id="points"
                                min=0
                                v-validate="'required'"></el-input>
                <span v-if="errors.has('points')" style="color: red;">
                    Points field is required
                </span>
            </el-col>

            <el-col :span="12">
                <p>Costs of points: {{ pointsResult }}</p>
            </el-col>

        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Application fee</label>
                <el-input type="number" placeholder="Application fee" v-model="application_fee" min=0></el-input>
            </el-col>
             <el-col :span="12">
                <label>Credit check</label>
                <el-input type="number" placeholder="Credit check" v-model="credit_check" min=0></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Attorney's fee (yours)</label>
                <el-input type="number" placeholder="Attorney's fee (yours)" v-model="attorney_fee_yours" min=0></el-input>
            </el-col>
            <el-col :span="12">
                <label>Attorney's fee (lenders)</label>
                <el-input type="number" placeholder="Attorney's fee (lenders)" v-model="attorney_fee_lenders" min=0></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Title search</label>
                <el-input type="number" placeholder="Title search" v-model="title_search" min=0></el-input>
            </el-col>
            <el-col :span="12">
                <label>Title insurance</label>
                <el-input type="number" placeholder="Title insurance" v-model="title_insurance" min=0></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">
            <el-col :span="12">
                <label>Appraisal fee</label>
                <el-input type="number" placeholder="Appraisal fee" v-model="appraisal_fee" min=0></el-input>
            </el-col>
            <el-col :span="12">
                <label>Inspections</label>
                <el-input type="number" placeholder="Inspections" v-model="inspections" min=0></el-input>
            </el-col>
        </el-row>

        <el-row :gutter="12">

            <el-col :span="12">
                <label>Local fees (taxes, transfers)</label>
                <el-input type="number" placeholder="Local fees (taxes, transfers)" v-model="local_fees" min=0></el-input>
            </el-col>

            <el-col :span="12">
                <label>Document preparation</label>
                <el-input type="number" placeholder="Document preparation" v-model="document_preparation" min=0></el-input>
            </el-col>

        </el-row>

        <el-row :gutter="12">

            <el-col :span="12">
                <label>Other</label>
                <el-input type="number" placeholder="Other" v-model="other" min=0></el-input>
            </el-col>
            
        </el-row>

        <!-- End Fees Section -->

        <!-- All Cost Section -->
        <div class="costs_section">
            <p>New Monthly Pament</p>
            <h1><span>$</span>{{ monthly_payment.toFixed(2) }}</h1>
            <p>Monthly Savings: ${{ monthly_savings.toFixed(2) }}</p>
            <p>Difference in Interest: ${{ diff_in_interest.toFixed(2) }}</p>
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
            current_monthly_payment: 765,
            current_loan_interest_rate: 4.5,
            balance: 100000,
            new_interest_rate: 3.5,
            remaining_loan_term: 15,
            new_loan_term: 15,
            monthly_payment: 0,
            new_interest_rate_upd: 0,
            new_loan_term_upd: 0,
            monthly_savings: 0,
            points: 1,
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

    created() {

        var new_interest_rate_upd = this.new_interest_rate / 12;
        console.log(new_interest_rate_upd);
        var interest_rate = new_interest_rate_upd / 100;
        console.log(interest_rate);
        var new_loan_term_mnt = this.new_loan_term * 12;
        console.log(new_loan_term_mnt);
        this.monthly_payment = parseFloat( ( ( this.balance * interest_rate ) / ( 1 - ( 1 / Math.pow( ( 1 + interest_rate ), new_loan_term_mnt ) ) ) ) );
        this.monthly_savings = this.current_monthly_payment - this.monthly_payment;
        let balancePoints = parseFloat(( this.balance ) / 100);
        this.pointsResult = (balancePoints * this.points);
        this.total_cost = this.pointsResult;
    },

    watch: {

        current_monthly_payment() {

            if( this.new_interest_rate != 0 ) {

                this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);

            }

            if( this.new_loan_term != 0 ) {

                this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;

            }

            if( this.monthly_payment != 0 && this.current_monthly_payment != 0 ) {

                this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );
            
            }

            if( this.current_monthly_payment == 0 || this.current_monthly_payment == '' ) {

                this.monthly_savings = 0;

            }

        },

        balance() {

            if( this.balance == 0 || this.balance == '' ) {

                this.monthly_payment = 0;
                this.pointsResult = 0;
                this.total_cost = 0;

            }

            if( this.new_interest_rate != 0 ) {

                this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);

            }

            if( this.new_loan_term != 0 ) {

                this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;

            }

            if( this.balance != 0 && this.new_interest_rate_upd != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );
                
                if( this.current_monthly_payment != 0 ) {

                    this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );

                }
            
            }

            if( this.points != 0 ) {

                let balancePoints = parseFloat(( this.balance ) / 100);
                this.pointsResult = (balancePoints * this.points);
                this.total_cost = this.pointsResult;

            }

        },

        new_interest_rate() {
                
            this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);

            if( this.new_loan_term != 0 ) {

                this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;

            }
            
            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term_upd != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );

                if( this.current_monthly_payment != 0 ) {

                    this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );

                }

            }

            if( this.new_interest_rate == 0 || this.new_interest_rate == '' ) {

                this.monthly_savings = 0;
                this.monthly_payment = 0;

            }

        },

        new_loan_term() {

            this.new_loan_term_upd = parseFloat( this.new_loan_term ) * 12;

            if( this.new_interest_rate != 0 ) {

                this.new_interest_rate_upd = parseFloat(( this.new_interest_rate / 12 )/100);

            }

            if( this.balance != 0 && this.new_interest_rate_upd != 0 && this.new_loan_term_upd != 0 ) {

                this.monthly_payment = parseFloat( ( ( this.balance * this.new_interest_rate_upd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.new_interest_rate_upd ), this.new_loan_term_upd ) ) ) ) );

                if( this.current_monthly_payment != 0 ) {

                    this.monthly_savings = parseFloat( this.current_monthly_payment - this.monthly_payment );

                }

            }

            if( this.new_loan_term == 0 || this.new_loan_term == '' ) {

                this.monthly_savings = 0;
                this.monthly_payment = 0;

            }

        },

        points() {

            if( this.balance != 0 && this.points != 0 ) {

                let balancePoints = parseFloat(( this.balance ) / 100);
                this.pointsResult = (balancePoints * this.points);
                this.total_cost = this.pointsResult;

            }

            if( this.points == 0 || this.points == '' ) {

                this.pointsResult = 0;
                this.total_cost = 0;

            }

        }

    },
    computed: {

        total_cost() {

                if( this.pointsResult ) {

                    return this.pointsResult + 
                            parseFloat( this.application_fee ) + 
                            parseFloat( this.credit_check ) +
                            parseFloat( this.attorney_fee_yours ) +
                            parseFloat( this.attorney_fee_lenders ) +
                            parseFloat( this.title_search ) +
                            parseFloat( this.title_insurance ) + 
                            parseFloat( this.appraisal_fee ) + 
                            parseFloat( this.inspections ) +
                            parseFloat( this.local_fees ) +
                            parseFloat( this.document_preparation ) +
                            parseFloat( this.other );

                } 

                else {
                    
                    return 0;
                
                }


        },

        months_rec_costs() {

            if( this.balance != 0 && this.monthly_savings != 0 && this.points != 0 ) {

                return parseFloat(( this.balance ) / ( this.monthly_savings * 100));

            } else {

                return 0;
                
            }

        },

        diff_in_interest() {

            if( this.current_monthly_payment != 0 && this.balance != 0 && this.remaining_loan_term != 0 && this.new_loan_term != 0 && this.monthly_payment != 0 ) {

                var old_interest_rate = ( this.current_monthly_payment * ( this.remaining_loan_term * 12 ) ) - this.balance;
                var new_interest_rate = ( this.monthly_payment * ( this.new_loan_term * 12 ) )  - this.balance;

                return (old_interest_rate - new_interest_rate);

            } else {

                return 0;

            }

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

.error {
    border-color: red;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px rgba(232,68,68,.6);
}
</style>
