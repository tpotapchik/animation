$(function () {
    var card = $('.designers-item-wrapper');

    $('.button').on('click', function () {

        if (window.innerWidth > 768) {
            $('.designers-item-wrapper:nth-child(1)').addClass('will-hide');
            $('.designers-item-wrapper:nth-child(2)').addClass('will-show');
            $('.designers-item-wrapper:nth-child(3)').addClass('will-show');

            animateElements();
        }
    });

    $('.button-again').on('click', function () {

        if (window.innerWidth > 768) {
            $('.designers-item-wrapper:nth-child(6)').addClass('will-hide');
            animateElements();

        }
    });

    $('.button-return').on('click', function () {

        if (window.innerWidth > 768) {

            $('.designers-item-wrapper:nth-child(3)').addClass('will-hide');
            $('.designers-item-wrapper:nth-child(2)').addClass('will-hide');
            $('.designers-item-wrapper:nth-child(1)').addClass('will-show');
            animateElements();

        }
    });

    function animateElements() {
        addFakeElements();
        calculatedPositions();

        setTimeout(function () {
            setInitPosition();
        }, 900);
    }

    function addFakeElements() {
        var willShow = $('.will-show'),
            willHide = $('.will-hide');

        if (willShow.length > willHide.length) {
            var i = willShow.length - willHide.length;
            while (i) { //
                $('.designers-block-inner').append('<div class="designers-item-wrapper need-remove-later"></div>');
                i--;
            }
        }
    }

    function pushyElements() {
        var card = $('.designers-item-wrapper');//надо заново объявить

        card.each(function () {
            var _this = $(this);

            if (_this.hasClass('need-remove-later')) {
                _this.remove();
            }

            if (!(_this.hasClass('will-hide') || _this.hasClass('hidden'))) {
                _this.addClass('pushy');
            }

            if (_this.hasClass('will-show')) {
                _this.addClass('pushy');
            }
        });
    }

    function addAbsoluteElements() {
        card.each(function () {
            var _this = $(this);

            if (_this.hasClass('will-show')) {
                _this.addClass('absolute').removeClass('hidden');
            }
        });
    }

    function calculatedPositions() {
        var initialArray = [],
            finalArray = [],
            card = $('.designers-item-wrapper');

        card.each(function () {
            var _this = $(this);

            if (!_this.hasClass('hidden')) {

                var initialPositionTop = _this.offset().top.toFixed(3),
                    initialElPositionLeft = _this.offset().left.toFixed(3);

                initialArray.push({
                    posTop: initialPositionTop,
                    posLeft: initialElPositionLeft
                });
            }
        });
        pushyElements();
        addAbsoluteElements();


        $('.pushy').each(function (index, value) {
            var _this = $(this);

            var finalPositionTop = _this.offset().top.toFixed(3),
                finalPositionLeft = _this.offset().left.toFixed(3);

            finalArray.push({
                posTop: finalPositionTop,
                posLeft: finalPositionLeft
            });

            if (_this.hasClass('absolute')) {
                var width = $('.designers-block-inner').outerWidth() / 3;
                _this.css({
                    "width": width + "px"
                });
            }

            var willMoveLeft = finalArray[index].posLeft - initialArray[index].posLeft;
            var willMoveTop = finalArray[index].posTop - initialArray[index].posTop;

            _this.css({
                "webkitTransform": "translate(" + (-willMoveLeft) + "px," + (-willMoveTop) + "px)",
                "MozTransform": "translate(" + (-willMoveLeft) + "px," + (-willMoveTop) + "px)",
                "msTransform": "translate(" + (-willMoveLeft) + "px," + (-willMoveTop) + "px)",
                "OTransform": "translate(" + (-willMoveLeft) + "px," + (-willMoveTop) + "px)",
                "transform": "translate(" + (-willMoveLeft) + "px," + (-willMoveTop) + "px)"
            });
        });
    }

    function setInitPosition() {
        card.each(function () {
            var _this = $(this);
            _this.css({
                "webkitTransform": "translate(" + (0) + "px," + (0) + "px)",
                "MozTransform": "translate(" + (0) + "px," + (0) + "px)",
                "msTransform": "translate(" + (0) + "px," + (0) + "px)",
                "OTransform": "translate(" + (0) + "px," + (0) + "px)",
                "transform": "translate(" + (0) + "px," + (0) + "px)"
            });

            _this.removeClass('pushy').removeAttr('style');

            if (_this.hasClass('will-hide')) {
                _this.removeClass('will-hide').addClass('hidden');
            }

            if (_this.hasClass('will-show')) {
                _this.removeClass('will-show').removeClass('absolute');
            }
        });
    }
});


