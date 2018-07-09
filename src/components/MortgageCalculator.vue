<template>
    <div class="mortagage_calculator">
        <h1>Mortgage Calculator</h1>

        <!-- Field Section -->

        <el-row :gutter="15">
            <el-col :span="24">
                <label>Home Price</label>
                <el-input type="number" placeholder="Home Price" 
                                min=0
                                v-model="homePrice" 
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
                                id="downPayment"></el-input>
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
            <h1><span>$</span> {{ (monthlyPayment).toFixed(2) }}</h1>
            <p>Total principal paid: ${{ principalPaid.toFixed(2) }}</p>
            <p>Total interest paid: ${{ (total_interest).toFixed(2) }}</p>
        
        </div>

        <el-row>

            <el-col>

                <el-button @click="paymentSchedule()" type="success" :disabled="errors.any()" v-if="showTable==false">Payment Schedule</el-button>
                <el-button @click="hidePaymentSchedule()" type="danger" v-if="showTable==true">Hide Payment Schedule</el-button>

            </el-col>
            
        </el-row>

        <div v-if="showTable">
            <el-row>

                <el-col :span="12">

                    <label>Start Date</label>
                    <el-input v-model="date" v-on:blur="myBlurFun()"></el-input>

                </el-col>
                
                <el-col>

                    <p>Estimated Payoff Date</p>
                    <h4>{{ date_selected }} {{ estPayOffDate }}</h4>

                </el-col>

            </el-row>

            <p><strong>Amortization Schedule</strong></p>

            <table>

                <thead>

                    <tr>

                        <th v-for="key in gridColumns"
                               :key="key">
                            
                            {{ key | capitalize }}

                        </th>

                    </tr>

                </thead>
                <tbody>
                    
                    <tr v-for="(entry, i) in gridData" :key="i">

                        <td v-for="(key, j) in gridColumns" :key="j">

                            {{ entry[key] }}

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

        <!-- End Cost Section -->

    </div>
</template>

<script>
export default {
    data() {
        return {
            homePrice: 120000,
            downPament: 20000,
            downPamentPerc: 0,
            mortgageTerm: 30,
            mortgageTermMonth: 360,
            annualInterestRate: 12,
            monthlyPayment: 0,
            principalPaid: 0,
            annualInterestRateUpd: 0,
            newValue: 0,
            date: "",
            showTable: false,
            gridColumns: [
                'PaymentDate', 'payment', 'principal', 'interest', 'totalInterest', 'balance'
            ],
            gridData: [],
            months: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            month: 0,
            date_selected: 0,
            year_selected: 0,
            estPayOffDate: ''
        }
    },

    created() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() +  1;
        var year = today.getFullYear();

        this.month = mm;
        this.year_selected = year;

        if( dd < 10 ) {

            dd = '0' + dd;

        }

        this.date_selected= dd;

        if( mm < 10 ) {

            mm = '0' + mm;

        }

        today = dd + '/' + mm + "/" + year;
        console.log(today)
        this.date = today;

        // Generating Amortization Schedule

        var ann_int_rate = ( this.annualInterestRate / 12);
        ann_int_rate /= 100;
        var principalPaid = this.downPament;
        var homePrice = this.homePrice - this.downPament;
        this.principalPaid = homePrice;
        this.monthlyPayment = parseFloat( ( ( homePrice * ann_int_rate ) / ( 1 - ( 1 / Math.pow( ( 1 + ann_int_rate ), this.mortgageTermMonth ) ) ) ) );

    },

    computed: {

        total_interest() {

            if( this.monthlyPayment != 0 && this.mortgageTermMonth != 0 && this.principalPaid != 0 ) {

                console.log( "Monthly Payment " + this.monthlyPayment );
                console.log( " Mortgage Term Month " + this.mortgageTermMonth );
                console.log( " Principal Paid " + this.principalPaid );
                var total_interest = parseFloat( ( this.monthlyPayment * this.mortgageTermMonth ) - this.principalPaid );
                return total_interest;

            } else {

                return 0;

            }

        }

    },
    
    watch: {

        homePrice: function() {

            this.showTable = false;
            
            if( this.principalPaid <= 0 ) {

                this.principalPaid = this.homePrice;
            
            }
            
            if( this.principalPaid != 0 ) {
                
                this.principalPaid = parseFloat( this.homePrice - this.downPament );
            
            }

            if( this.annualInterestRate != 0 ) {

                this.annualInterestRateUpd = parseFloat(( this.annualInterestRate / 12 ) / 100);
            
            }

            if( this.mortgageTerm != 0 ) {

                this.mortgageTermMonth = parseFloat( this.mortgageTerm ) * 12;
            
            }

            if( this.annualInterestRateUpd != 0 && this.mortgageTermMonth != 0 && this.principalPaid != 0 ) {
                
                this.monthlyPayment = parseFloat( ( ( this.principalPaid * this.annualInterestRateUpd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.annualInterestRateUpd ), this.mortgageTermMonth ) ) ) ) );
            
            }

            if( this.homePrice == 0 || this.homePrice == '') {

                this.monthlyPayment = 0;
                this.principalPaid = 0;

            }

        },

        downPament() {

            this.showTable = false;

            if( this.principalPaid == 0 ) {
                
                this.principalPaid = this.homePrice;
            
            }

            if( this.homePrice != 0 ) {

                this.principalPaid = parseFloat( this.homePrice - this.downPament );
            
            }

            if( this.annualInterestRate != 0 ) {

                this.annualInterestRateUpd = parseFloat(( this.annualInterestRate / 12 ) / 100);
            
            }

            if( this.mortgageTerm != 0 ) {

                this.mortgageTermMonth = parseFloat( this.mortgageTerm ) * 12;
            
            }

            if( this.annualInterestRateUpd != 0 && this.mortgageTermMonth != 0 && this.homePrice != 0 && this.principalPaid != 0 ) {

                this.monthlyPayment =  parseFloat( ( ( this.principalPaid * this.annualInterestRateUpd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.annualInterestRateUpd ), this.mortgageTermMonth ) ) ) ) );
            
            }

        },

        mortgageTerm() {

            this.showTable = false;

            if( this.mortgageTerm != 0 ) {

                this.mortgageTermMonth = parseFloat( this.mortgageTerm ) * 12;
            
            }

            if( this.homePrice != 0 ) {

                this.principalPaid = parseFloat( this.homePrice - this.downPament );

            }
            
            if( this.annualInterestRate != 0 ) {

                this.annualInterestRateUpd = parseFloat(( this.annualInterestRate / 12 ) / 100);
            
            }

            if( this.homePrice == 0 && this.annualInterestRateUpd == 0 ) {

                this.monthlyPayment = 0;
            
            }

            if( this.homePrice != 0 && this.annualInterestRateUpd != 0 && this.principalPaid > 0 ) {

                this.monthlyPayment = parseFloat( ( this.principalPaid * this.annualInterestRateUpd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.annualInterestRateUpd ), this.mortgageTermMonth ) ) ) );
            
            }

            if( this.mortgageTerm == 0 || this.mortgageTerm == '' ) {

                this.monthlyPayment = 0;
                this.principalPaid = 0;

            }
            
            else {

                this.monthlyPayment =  parseFloat( ( ( this.principalPaid * this.annualInterestRateUpd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.annualInterestRateUpd ), this.mortgageTermMonth ) ) ) ) );
            
            }

        },

        mortgageTermMonth() {

            this.showTable = false;

            if( this.mortgageTermMonth != 0 ) {

                this.mortgageTerm = this.mortgageTermMonth / 12;

            }

            if( this.mortgageTermMonth == '' ) {

                this.mortgageTerm = 0;

            }

        },

        annualInterestRate() {

            this.showTable = false;
            
            this.annualInterestRateUpd = parseFloat(( this.annualInterestRate / 12 ) / 100); 

            if( this.principalPaid == 0 ) {

                this.principalPaid = this.homePrice;

            }

            

            if( this.annualInterestRate == 0 || this.annualInterestRate == '' ) {

                this.monthlyPayment = 0;
                this.principalPaid = 0;

            }       

            if( this.homePrice != 0 && this.annualInterestRateUpd != 0 && this.mortgageTerm != 0 && this.principalPaid != 0) {

                this.monthlyPayment = parseFloat( ( this.principalPaid * this.annualInterestRateUpd ) / ( 1 - ( 1 / Math.pow( ( 1 + this.annualInterestRateUpd ), this.mortgageTermMonth ) ) ) ); 
            
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
    },
    filters: {

        capitalize: function (str) {
        
            return str.charAt(0).toUpperCase() + str.slice(1)
        
        }

    },
    methods: {

        paymentSchedule() {

            this.showTable= true;

            var p;
            var i = 0;

            while( i <= this.monthlyPayment ) {

                var root_year = this.year_selected;

                this.gridData.push({
                    PaymentDate: '',
                    payment: 0,
                    principal: 0,
                    interest: 0,
                    totalInterest: 0,
                    balance: 0
                });

                p = this.principalPaid;

                var ann_int = this.annualInterestRate;
                var total_interest = 0;
                var monthIndex = this.month;

                this.gridData.forEach(element => {
                    

                    if( this.months[monthIndex] == 'Jan' || monthIndex == 12) {
                        
                        if( monthIndex == 12 ){

                            monthIndex = 0

                        }
                        

                        element.PaymentDate = this.months[monthIndex] + ' ' + ((root_year + 1).toString());

                        
                        root_year = root_year + 1;

                    } else {

                        element.PaymentDate = this.months[monthIndex]+ ' ' + ((root_year).toString());

                    }
                    


                    element.payment = (this.monthlyPayment).toFixed(3);

                    var interest = parseFloat( ( p * (  ann_int / 100 ) ) / 12 );

                    element.interest = interest.toFixed(2);
                    total_interest = (parseFloat(interest) + parseFloat(total_interest));
                    element.totalInterest = total_interest.toFixed(2);

                    element.principal = ( this.monthlyPayment - element.interest ).toFixed(2);
                    var principal_upd = ( this.monthlyPayment - element.interest );

                    if(  p - principal_upd < 1  ) {

                        var balance_final = 0;
                        element.balance = balance_final.toFixed(2);
                        this.estPayOffDate = element.PaymentDate;
                    
                    } 

                    else {

                        element.balance = ( p - principal_upd ).toFixed(2); 
                    
                    }
                    
                    var balance_upd = ( p - principal_upd );
                    p = balance_upd;

                    monthIndex+=1;
                    if(monthIndex == 12) {
                        monthIndex = 0;
                    }

                });

                if( p < 1 ) {

                    break;

                }

                i = this.monthlyPayment - p;
            
            }

        },

        hidePaymentSchedule() {

            this.showTable = false;
            this.gridData.length = 0;

        },

        myBlurFun() {

            var str = this.date;
            var month = str.substring(3, 5);
            var date = str.substring(0, 2);
            this.date_selected = date;
            this.month = parseInt(month);
            this.gridData = [];
            this.paymentSchedule();

        }

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

body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  width: 100%;
}

th {
  background-color: #4CAF50;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  padding: 10px 18px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

tr {
    text-align: center;
}
</style>
