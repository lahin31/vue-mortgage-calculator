<template>
    <div class="morgage_payment_calc">
        <h1 style="text-align: center">Mortgage Payment Calculator</h1>
        <div class="loan-info">
            <p><strong>Loan Information:</strong></p>
            <el-row>
                <el-col :span="12">
                    <label>Mortgage Amount</label>
                    <el-input type="number" placeholder="Mortgage Amount" v-model="mortgage_amount" 
                                    min=0
                                    name="mortgage_amount"
                                    id="mortgage_amount"
                                    v-validate="'required'"></el-input>
                    <span v-if="errors.has('mortgage_amount')" style="color: red;">
                        Mortgage Amount field is required
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <label>Term in years</label>
                    <el-input type="number" placeholder="Term in years" v-model="term_in_years" 
                                    min=0
                                    name="term_in_years"
                                    id="term_in_years"
                                    v-validate="'required'"></el-input>
                    <span v-if="errors.has('term_in_years')" style="color: red;">
                        Term in Year field is required
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <label>Interest Rate</label>
                    <el-input type="number" placeholder="Interest Rate" v-model="interest_rate" 
                                    min=0
                                    name="interest_rate"
                                    id="interest_rate"
                                    v-validate="'required'"></el-input>
                    <span v-if="errors.has('interest_rate')" style="color: red;">
                       Interest Rate field is required
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <label>Annual property taxes</label>
                    <el-input type="number" placeholder="Annual property taxes" v-model="annual_property_taxes" 
                                    min=0
                                    name="annual_property_taxes"
                                    id="annual_property_taxes"
                                    v-validate="'required'"></el-input>
                    <span v-if="errors.has('annual_property_taxes')" style="color: red;">
                       Annual Property Taxes field is required
                    </span>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <label>Annual Home Insurance</label>
                    <el-input type="number" placeholder="Annual Home Insurance" v-model="annual_property_insurance"
                                    min=0
                                    name="annual_property_insurance"
                                    id="annual_property_insurance"
                                    v-validate="'required'"></el-input>
                    <span v-if="errors.has('annual_property_insurance')" style="color: red;">
                       Annual Home Insurance field is required
                    </span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <label><strong>Monthly Payment(PI):</strong></label>
                    <p>{{ pi }}</p>
                </el-col>
            </el-row>
             <el-row>
                <el-col :span="12">
                    <label><strong>Monthly Payment(PITI):</strong></label>
                    <p>{{ piti }}</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            mortgage_amount: 0,
            term_in_years: 0,
            interest_rate: 0,
            annual_property_taxes: 0,
            annual_property_insurance: 0
        }
    },

    computed: {

        pi: {

            get: function() {

                if( this.interest_rate != 0 && this.mortgage_amount != 0 && this.term_in_years != 0 ) {

                    var interest_rate_perc = parseFloat( this.interest_rate ) / 12;
                    var interest_rate_ans = parseFloat( interest_rate_perc ) / 100;

                    var int_rate_amnt = parseFloat(interest_rate_ans * this.mortgage_amount);
                    var total_month = parseFloat( this.term_in_years ) * 12;


                    var pi = int_rate_amnt / (  1 - (Math.pow((1 + interest_rate_ans), -(total_month) )));
                    return pi;

                }

            },

            set: function(newValue) {}

        },

        piti: {

            get: function() {

                if( this.interest_rate != 0 && this.mortgage_amount != 0 && this.term_in_years != 0 && ( this.annual_property_taxes != 0 || this.annual_property_insurance != 0 )) {

                    var interest_rate_perc = parseFloat( this.interest_rate ) / 12;
                    var interest_rate_ans = parseFloat( interest_rate_perc ) / 100;

                    var int_rate_amnt = parseFloat(interest_rate_ans * this.mortgage_amount);
                    var total_month = parseFloat( this.term_in_years ) * 12;


                    var pi = int_rate_amnt / (  1 - (Math.pow((1 + interest_rate_ans), -(total_month) )));
                    
                    
                    var piti = pi + ( this.annual_property_taxes / 12 ) + (this.annual_property_insurance / 12);

                    return piti;

                } 

            },
             
            set: function(newValue) {

            }

        }

    }
}
</script>

<style>
.morgage_payment_calc {
    width: 50%;
    background-color: #FFFFFF;
    margin: 0 auto;
    padding: 8px;
    border: 1px solid #CFCFD4;
}

.loan-info {
    background-color: #E7EDF5;
}
</style>
