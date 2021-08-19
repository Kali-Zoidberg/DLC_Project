class HomeMediator extends Mediator{
    constructor(loanInquiryForm) {
        super();
        const _this = this;
        _this.loanInquiryForm = loanInquiryForm;
    }

    start() {
        const _this = this;
        _this.bindEventListeners();
    }

    /**
     * Binds all event listeners for each module contained in the home mediator.
     */
    bindEventListeners() {
        const _this = this;
        _this.loanInquiryForm.bindEventListeners();
        // for (const module of _this.modules) {
        //     module.bindEventListeners();
        // }

    }




}