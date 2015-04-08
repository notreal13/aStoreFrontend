describe('Should signup, login and purchase:', function() {
    var menu;
    var testUsername;
    var testPassword = '123';
    var testFirstName = 'Test';
    var testLastName = 'TestTest';
    var testPhone = '000';

    var msgError1 = '';
    var msgError2 = '';

    var secretLink = '';

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    it('open start page', function() {
        browser.get('http://localhost:9000');
        element(by.id('menu_language')).click();
        element(by.id('lang_en')).click();

        menu = element(by.binding('main.userInfo.firstName'));
        menu.getText().then(function(text) {
            expect(text).toBe('anonymous');
        });
    });

    it('open signup page', function() {
        menu.click();
        element(by.id('a_signup')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/signup');
    });

    it('fill signup form (with wrond confirm password)', function() {
        testUsername = 'test@' + getRandomInt(0, 100000);

        element(by.model('signup.user.username')).sendKeys(testUsername);
        element(by.model('signup.user.password')).sendKeys(testPassword);
        element(by.model('signup.user.passwordConfirm')).sendKeys(testPassword + '1');
        element(by.model('signup.user.firstName')).sendKeys(testFirstName);
        element(by.model('signup.user.lastName')).sendKeys(testLastName);
        element(by.model('signup.user.phone')).sendKeys(testPhone);

        expect(element(by.css('.btn-success')).getAttribute('disabled')).toEqual('true');
    });

    it('correct password and signup', function() {
        element(by.model('signup.user.passwordConfirm')).clear();
        element(by.model('signup.user.passwordConfirm')).sendKeys(testPassword);    
        element(by.css('.btn-success')).click();

        // var msg = element(by.id('signup_msg_success')).getText();
        // msg.then(function(data) {
        //     console.log('---------' + data);
        //     expect(data.length > 0).toBeTruthy();
        // })
    });

    it('go to start page', function() {
        element(by.id('a_goto_back')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
    });

    it('go to login page', function() {

        menu.click();
        element(by.id('a_login')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/login');
    });

    it('login with wrong password', function() {
        element(by.model('login.credentials.username')).sendKeys(testUsername);
        element(by.model('login.credentials.password')).sendKeys(testPassword + '1');
        element(by.css('.btn-success')).click();

        msgError1 = element(by.id('login_msg_error')).getText();
        msgError1.then(function(data) {
            expect(data.length > 0).toBeTruthy();
            // console.log(data);
        })
    });

    it('login with correct password, but not activated', function() {
        element(by.model('login.credentials.username')).sendKeys(testUsername);
        element(by.model('login.credentials.password')).sendKeys(testPassword);
        element(by.css('.btn-success')).click();

        msgError2 = element(by.id('login_msg_error')).getText();
        msgError2.then(function(data) {
            // console.log(data);            
            expect(data.length > 0).toBeTruthy();
            expect(msgError2).not.toBe(msgError1);
        })

    });

    it('get secret link (from helper service)', function() {
        console.log('username = ' + testUsername);
        browser.driver.ignoreSynchronization = true;
        browser.driver.get('http://localhost:8080/aStoreTestHelper/rest/user/' + testUsername);
        var el = browser.driver.findElement(by.css('pre'));
        el.getText().then(function(text) {
            secretLink = text;
            console.log(secretLink);
            expect(secretLink.length > 0).toBeTruthy();
            browser.driver.ignoreSynchronization = false;
        });

    });

    it('activate accout from secret link', function() {    
        var url1;

        browser.driver.ignoreSynchronization = true;
        url1 = 'http://localhost:8080/rest/user/activation/' + secretLink;
        console.log('go to secretLink ' + url1);        
        browser.driver.get(url1);
        browser.driver.ignoreSynchronization = false;
    });

    it('login with correct password', function() {
        browser.get('http://localhost:9000');
        element(by.id('menu_language')).click();
        element(by.id('lang_en')).click();
        menu.click();
        element(by.id('a_login')).click();

        element(by.model('login.credentials.username')).sendKeys(testUsername);
        element(by.model('login.credentials.password')).sendKeys(testPassword);
        element(by.css('.btn-success')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
        // browser.pause();
    });

    it('should cart be empty', function() {
        element(by.id('label_cart_empty')).getText().then(function(text) {
            expect(text).toBe('Empty');
        });
    });

    it('add ticket to cart', function() {
        arrow_krym = element(by.className('arrow-kavkaz')).click();

        element(by.id('a_man')).click();
        element(by.id('btn_adult')).click();

        element(by.id('label_cart_full')).getText().then(function(text) {
            expect(text).toBe('1 item');
        });
    });

    it('fill the purchase form completely', function() {
        element(by.id('a_cart')).click();

        element(by.id('tr_0')).element(by.name('firstName')).sendKeys('First Name');
        element(by.id('tr_0')).element(by.name('lastName')).sendKeys('Last Name');
        element(by.id('tr_0')).element(by.name('middleName')).sendKeys('Middle Name');
        element(by.id('tr_0')).element(by.name('day')).element(by.css('option[value="3"]')).click();
        element(by.id('tr_0')).element(by.name('month')).element(by.css('option[value="3"]')).click();
        element(by.id('tr_0')).element(by.name('year')).element(by.css('option[value="33"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocument')).element(by.css('option[value="0"]')).click();
        element(by.id('tr_0')).element(by.name('supportingDocumentData')).sendKeys('xxx 111');

        element(by.id('a_checkout')).click();
        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/checkout');
    });

    it('check checkout form', function() {
        element(by.name('email')).getAttribute('value').then(function(data) {
            expect(data).toBe(testUsername);
        });
        element(by.name('firstName')).getAttribute('value').then(function(data) {
            expect(data).toBe(testFirstName);
        });
        element(by.name('lastName')).getAttribute('value').then(function(data) {
            expect(data).toBe(testLastName);
        });
        element(by.name('phone')).getAttribute('value').then(function(data) {
            expect(data).toBe(testPhone);
        })
    });

    it('check confirmation number', function() {
        element(by.id('btn_submit')).click();        
        element(by.id('orderId')).getText().then(function(data) {
            expect(isNaN(data)).toEqual(false);
        });
    });

    it('logout', function() {
        menu.click();
        element(by.id('a_logout')).click();

        expect(browser.getLocationAbsUrl()).toBe('http://localhost:9000/route');
        menu.getText().then(function(text) {
            expect(text).toBe('anonymous');
        });
    });
});