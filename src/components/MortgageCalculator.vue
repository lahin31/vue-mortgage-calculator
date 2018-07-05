<template>
    <div class="mortagage_calculator">
        <h1>Mortgage Calculator</h1>

        <!-- Field Section -->

        <el-row :gutter="15">
            <el-col :span="24">
                <label>Home Price</label>
                <el-input type="number" placeholder="Home Price" v-model="homePrice" 
                                min=0 
                                name="homePrice" 
                                id="homePrice" 
                                v-validate="'required'"
                                :class="{'error': errors.has('homePrice') }"></el-input>
                <span v-if="errors.has('homePrice')" style="color: red;">
                    Home Price field is required
                </span>
            </el-col>
        </el-row>
         <el-row :gutter="15">
            <el-col :span="12">
                <label>Down Pament</label>
                <el-input type="number" placeholder="Down Payment" 
                                v-model="downPament" 
                                min=0
                                name="downPayment"
                                id="downPayment"
                                v-validate="'required'"
                                :class="{'error': errors.has('downPayment') }"></el-input>
                <span v-if="errors.has('downPayment')" style="color: red;">
                    Down Payment field is required
                </span>
            </el-col>
            <el-col :span="12">
                <label>Down Pament Percentage</label>
                <el-input type="number" placeholder="Down Pament Percentage" 
                                v-model="downPamentPerc"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <label>Mortgage term</label>
                <el-input type="number" placeholder="Mortgage Term" min=0
                                v-model="mortgageTerm"
                                name="mortgageTerm"
                                id="mortgageTerm"
                                v-validate="'required'"
                                :class="{'error': errors.has('mortgageTerm') }"></el-input>
                <span v-if="errors.has('mortgageTerm')" style="color: red;">
                    Mortgage Term field is required
                </span>
            </el-col>
            <el-col :span="12">
                <label>Mortgage term month</label>
                <el-input type="number" 
                                placeholder="Mortgage Term Month" 
                                v-model="mortgageTermMonth"
                                min=0></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="12">
                <label>Annual interest rate</label>
                <el-input type="number" placeholder="Annual interest rate" min=0
                                v-model="annualInterestRate" 
                                name="annualInterestRate"
                                id="annualInterestRate"
                                v-validate="'required'"
                                :class="{'error': errors.has('annualInterestRate') }"></el-input>
                <span v-if="errors.has('annualInterestRate')" style="color: red;">
                    Annual Interest Rate field is required
                </span>
            </el-col>
        </el-row>

        <!-- End Field Section -->

        <!-- All Cost Section -->

        <div style="margin-top: 10px; margin-left: 0;">
            <p>Your estimated monthly payment:</p>
            <h1><span>$</span> {{ (monthlyPayment).toFixed(3) }}</h1>
            <p>Total principal paid: ${{ principalPaid }}</p>
            <p>Total interest paid: ${{ (total_interest).toFixed(2) }}</p>
        </div>

        <!-- End Cost Section -->

    </div>
</template>

<script>
export default {
    data() {
        return {
            homePrice: 0,
            downPament: 0,
            downPamentPerc: 0,
            mortgageTerm: 0,
            mortgageTermMonth: 0,
            annualInterestRate: 0,
            monthlyPayment: 0,
            principalPaid: 0,
            myValue: 0,
            newValue: 0
        }
    },

    computed: {

        total_interest() {

            if( this.monthlyPayment != 0 && this.mortgageTermMonth != 0 && this.principalPaid ) {

                var total_interest = ( this.monthlyPayment * this.mortgageTermMonth ) - this.principalPaid;
                return total_interest;

            } else {

                return 0;

            }

        }

    },
    
    watch: {

        homePrice(){

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;
            
            }

            if( this.downPament == 0 && this.mortgageTerm == 0 && this.annualInterestRate == 0 ) {
                
                this.monthlyPayment = 0;

            }

            if( this.principalPaid != 0 ) {
                
                this.principalPaid = parseFloat( this.homePrice - this.downPament );
            
            }

            if( this.myValue != 0 && this.mortgageTermMonth != 0 && this.principalPaid ) {
                
                this.monthlyPayment = parseFloat( ( ( this.principalPaid * this.myValue ) / ( 1 - ( 1 / Math.pow( ( 1 + this.myValue ), this.mortgageTermMonth ) ) ) ) );
            
            }

        },

        downPament() {

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;
            
            }

            if( this.homePrice != 0 ) {

                this.principalPaid = parseFloat( this.homePrice - this.downPament );
            
            }

            if( this.myValue != 0 && this.mortgageTermMonth != 0 && this.homePrice != 0 && this.principalPaid != 0 ) {

                this.monthlyPayment =  parseFloat( ( ( this.principalPaid * this.myValue ) / ( 1 - ( 1 / Math.pow( ( 1 + this.myValue ), this.mortgageTermMonth ) ) ) ) );
            
            }
        },

        mortgageTerm() {

            if( this.mortgageTerm != 0 ) {

                this.mortgageTermMonth = parseFloat( this.mortgageTerm ) * 12;

            }

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;

            }

            if( this.homePrice == 0 && this.myValue == 0 ) {

                this.monthlyPayment = 0;

            }

            if( this.homePrice != 0 && this.myValue != 0 && this.principalPaid != 0 ) {

                this.monthlyPayment = parseFloat( ( this.principalPaid * this.myValue ) / ( 1 - ( 1 / Math.pow( ( 1 + this.myValue ), this.mortgageTermMonth ) ) ) );
            
            }

        },

        mortgageTermMonth() {

            if( this.mortgageTermMonth != 0 ) {

                this.mortgageTerm = this.mortgageTermMonth / 12;

            }

            if( this.mortgageTermMonth == '' ) {

                this.mortgageTerm = 0;

            }

        },

        annualInterestRate() {

            this.myValue = parseFloat(( this.annualInterestRate / 12 ) / 100); 

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;

            }

            if( this.homePrice == 0 && this.myValue == 0 && this.mortgageTerm == 0 ) {

                this.monthlyPayment = 0;

            }         

            if( this.homePrice != 0 && this.myValue != 0 && this.mortgageTerm != 0 && this.principalPaid ) {

                this.monthlyPayment = parseFloat( ( this.principalPaid * this.myValue ) / ( 1 - ( 1 / Math.pow( ( 1 + this.myValue ), this.mortgageTermMonth ) ) ) ); 
            
            }

        },

        // downPamentPerc() {

        //     if( this.homePrice != 0 ) {

        //         if(this.downPamentPerc == '' ) {

        //             this.downPamentPerc = 0;

        //         }

        //         let res = ( this.homePrice / 100 );
        //         this.newValue = res * this.downPamentPerc;
        //         console.log(this.newValue);
        //         this.downPament = this.newValue;
                
        //     }
        // }
    }
}
</script>

<style>

.mortagage_calculator {
    width: 50%;
    background-color: #F0F0F2;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #CFCFD4;
}

.mortagage_calculator h1:nth-child(1) {
    text-align: center;
}

.error {
    border-color: red;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 5px rgba(232,68,68,.6);
}
</style>
