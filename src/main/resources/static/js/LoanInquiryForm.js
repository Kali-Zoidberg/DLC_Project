class LoanInquiryForm {

    /**
     *
     * @param loanType Loan Type field (DOM)
     * @param loanTerm Loan Term field (DOM)
     * @param loanAmount Loan Amount field (DOM)
     * @param interestRate interest rate field (DOM)
     * @param downPayment downPayment (DOM)
     * @param calculateButton calculateButton (DOM)
     */
    constructor(loanType, loanTerm, loanAmount, interestRate, downPayment, calculateButton) {
        this.loanType = loanType;
        this.loanTerm = loanTerm;
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
        this.downPayment = downPayment;
        this.calculateButton = calculateButton;
        this.formChanged = false;

    }

    bindEventListeners() {
        const _this = this;
        _this.bindLoanTypeListeners();
        _this.bindLoanTermListeners();
        _this.bindLoanAmountListeners();
        _this.bindInterestRateListeners();
        _this.bindDownPaymentListeners();
        _this.bindCalculateListener();
    }

    /**
     * Binds listenres for loan type. (numerical forcing)
     */
    bindLoanTypeListeners() {
        const _this = this;
        _this.bindLoanTypeChangeListener();
    }

    /**
     * Loan Type change listener
     */
    bindLoanTypeChangeListener() {
        const _this = this;
        _this.loanType.addEventListener('change', function () {
            _this.formChanged = true;
        });
    }

    
    bindLoanTermListeners() {
        const _this = this;
        _this.bindLoanTermChangeListener();
    }

    /**
     * Loan Term change event
     */
    bindLoanTermChangeListener() {
        const _this = this;

        _this.loanTerm.addEventListener('change', function () {
            _this.formChanged = true;
        });
    }
    
    bindLoanAmountListeners() {
        const _this = this;
        _this.bindLoanAmountChangeListener();
    }

    /**
     * Loan Amount change event.
     */
    bindLoanAmountChangeListener() {
        const _this = this;

        _this.loanAmount.addEventListener('change', function () {
            _this.formChanged = true;
        });
    }
    
    bindInterestRateListeners() {
        const _this = this;
        _this.bindInterestRateChangeListener();
    }


    /**
     * Interest Rate Change listener
     */
    bindInterestRateChangeListener() {
        const _this = this;

        _this.interestRate.addEventListener('change', function () {
            _this.formChanged = true;
        });
    }

    bindDownPaymentListeners() {
        const _this = this;
        _this.bindDownPaymentChangeListener();
    }

    /**
     * Down Payment Change Listener
     */
    bindDownPaymentChangeListener() {
        const _this = this;

        _this.downPayment.addEventListener('change', function () {
            _this.formChanged = true;
        });
    }

    bindCalculateListener() {
        const _this = this;
        _this.bindCalculateClickListener();
    }

    /**
     * CalculateButton click listener which submits post and returns calculation.
     */
    bindCalculateClickListener() {
        const _this = this;

        _this.calculateButton.addEventListener('click', function () {
            const postParams = {
                'loanType' : _this.loanType.value,
                'loanTerm' : _this.loanTerm.value,
                'loanAmount' : _this.loanAmount.value,
                'interestRate' : _this.interestRate.value,
                'downPayment' : _this.downPayment.value
            };

            //Need to handle different loanTypes
            $.ajax( {
                url:'/inquiryRefinance',
                type: 'POST',
                data: JSON.stringify(postParams),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    //Json is interpreted and then used to generate html :).
                    //@Nick
                    //Look into other frameworks than vanilla js to generate html.
                }
            });

        });
    }


}