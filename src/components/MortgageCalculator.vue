<template>
    <div>
        <h1>Mortgage Calculator</h1>
        <el-row>
            <p>Home Price</p>
            <el-col :span="8">
                <el-input placeholder="Home Price" v-model="homePrice" min=0></el-input>
            </el-col>
        </el-row>
         <el-row :gutter="15" style="margin-top: 10px">
             <p>Down Pament</p>
            <el-col :span="4">
                <el-input placeholder="Down Payment" v-model="downPament" min="0"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input v-model="downPamentPerc"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="15" style="margin-top: 10px">
            <p>Mortgage term</p>
            <el-col :span="4">
                <el-input placeholder="Mortgage Term" v-model="mortgageTerm"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="Mortgage Term Month" v-model="mortgageTermMonth"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <p>Annual interest rate</p>
            <el-col :span="4">
                <el-input placeholder="Annual interest rate" v-model="annualInterestRate" min="0"></el-input>
            </el-col>
        </el-row>
        <div style="margin-top: 10px;">
            <p>Your estimated monthly payment:</p>
            <h1><span>$</span> {{ (monthlyPayment).toFixed(3) }}</h1>
            <p>Total principal paid: {{ principalPaid }}</p>
        </div>
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

            this.mortgageTermMonth = parseFloat( this.mortgageTerm ) * 12;

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;

            }

            if( this.homePrice == 0 && this.myValue == 0 ) {

                this.monthlyPayment = 0;

            }

            if( this.homePrice != 0 && this.myValue != 0 && this.principalPaid != 0 ) {

                this.monthlyPayment = parseFloat( ( this.principalPaid * this.myValue ) / ( 1 - ( 1 / Math.pow( ( 1 + this.myValue ), this.mortgageTermMonth ) ) ) );
            
            }

            if( this.mortgageTerm == '' ) {

                this.mortgageTerm = 0;

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

