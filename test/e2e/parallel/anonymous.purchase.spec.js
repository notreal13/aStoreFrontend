describe('Should anonymous purchase two tickets:', function() {

    it('empty cart', function() {
        browser.get('http://localhost:9000');

        element(by.id('menu_language')).click();
        element(by.id('lang_en')).click();
// element.all(by.repeater('language in main.languages')).get(0).click();
        element(by.id('label_cart_empty')).getText().then(function(text) {
            expect(text).toBe('Empty');
        });
    });

    it('add ticket(MAN) to cart', function() {
        arrow_krym = element(by.className('arrow-krym')).click();

        element(by.id('a_man')).click();
        element(by.id('btn_adult')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('1 item');
        });
    });

    it('add ticket(VEHICLE) to cart', function() {

        element(by.id('btn_back')).click();

        element(by.id('a_vehicle')).click();
        element(by.id('btn_avto2')).click();

        element(by.id('a_cart')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('2 items');
        });
    });

    it('fill the purchase form (without one required field)', function() {

        element(by.id('tr_0')).element(by.name('firstName')).sendKeys('First Name');
        element(by.id('tr_0')).element(by.name('lastName')).sendKeys('Last Name');
        element(by.id('tr_0')).element(by.name('middleName')).sendKeys('Middle Name');
        element(by.id('tr_0')).element(by.name('day')).element(by.css('option[value="3"]')).click();
        element(by.id('tr_0')).element(by.name('month')).element(by.css('option[value="3"]')).click();
        element(by.id('tr_0')).element(by.name('year')).element(by.css('option[value="33"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocumentData')).sendKeys('xxx 111');

        element(by.id('tr_1')).element(by.name('licensePlate')).sendKeys('AMP777199');
        element(by.id('tr_1')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();

        expect(element(by.id('a_checkout')).getAttribute('disabled')).toEqual('true');
    });

    it('fill the purchase form completely', function() {
        element(by.id('tr_1')).element(by.name('supportingDocumentData')).sendKeys('yyy 222');
        element(by.id('a_checkout')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/checkout');
    });

    it('fill the checkout form (without one required field', function() {
        element(by.name('email')).sendKeys('example@example.com');
        element(by.name('firstName')).sendKeys('First Name');
        element(by.name('lastName')).sendKeys('Last Name');
        expect(element(by.id('btn_submit')).getAttribute('disabled')).toEqual('true');
    });

    it('fill the checkout form completely and check confirmation number', function() {
        element(by.name('phone')).sendKeys('322-33-22');
        element(by.id('btn_submit')).click();

        element(by.id('orderId')).getText().then(function(data) {
            expect(isNaN(data)).toEqual(false);
        });
    });

});