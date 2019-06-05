$(function () {
    var card = $('.designers-item-wrapper');

    $('.button').on('click', function () {

        if (window.innerWidth > 768) {
            $('.designers-item-wrapper:nth-child(1)').addClass('visibility-hidden');


            setTimeout(function () {
                $('.designers-item-wrapper:nth-child(2)').removeClass('hidden');
            }, 1000);

            animateElements();
        }
    });

    $('.button-again').on('click', function () {

        if (window.innerWidth > 768) {
            $('.designers-item-wrapper:nth-child(5)').addClass('visibility-hidden');
            animateElements();
        }
    });

    $('.button-return').on('click', function () {
        // $('.designers-item-wrapper').removeClass('hidden');

        $('.designers-item-wrapper:nth-child(1)').addClass('will-show-soon');
        $('.designers-item-wrapper:nth-child(2)').addClass('will-show-soon');

        var i = $('.will-show-soon').length;
        while (i) { // при i, равном 0, значение в скобках будет false и цикл остановится
            $('.designers-block-inner').append('<div class="designers-item-wrapper visibility-hidden need-remove-later">');
            i--;
        }

        card.each(function () {
            var _this = $(this);

            if (_this.hasClass('will-show-soon')) {
                _this.nextAll().addClass('calculated-elements');
            }
        });

        $('.designers-item-wrapper.calculated-elements').each(function (index, item) {
            var _this = $(this);
            if (_this.hasClass('hidden')) {
                _this.removeClass('calculated-elements');
            }
        });

        // setStartPosition();
        // var positionArray1 = [];

        $('.designers-item-wrapper.calculated-elements').each(function (index, item) {
            var _this = $(this),
                topInitial = _this.offset().top.toFixed(3),
                leftInitial = _this.offset().left.toFixed(3);
            // console.log(item);
            // item.classList.add("qwerty_" + index);
            item.setAttribute('data-top-initial', topInitial);
            item.setAttribute('data-left-initial', leftInitial);
            // _this.data('top-initial', topInitial);
            // _this.data('left-initial', leftInitial);

            // positionArray1.push({
            //     posTop: topInitial,
            //     posLeft: leftInitial
            // });

            // console.log(positionArray1);

            console.log('topInitial ' + topInitial);
            console.log('leftInitial ' + leftInitial);

        });

        $('.designers-item-wrapper.calculated-elements').each(function (index, item) {
            var _this = $(this),
                topInitial = _this.offset().top.toFixed(3),
                leftInitial = _this.offset().left.toFixed(3);

            item.setAttribute('data-top-initial', topInitial);
            item.setAttribute('data-left-initial', leftInitial);


            // positionArray1.push({
            //     posTop: topInitial,
            //     posLeft: leftInitial
            // });

            // console.log(positionArray1);

            console.log('topInitial ' + topInitial);
            console.log('leftInitial ' + leftInitial);

        });

        // $('.designers-item-wrapper.calculated-elements').each(function () {
        //     var _this = $(this);
        //     if (!_this.hasClass('hidden')) {
        //         _this.addClass('pushy-element');
        //     }
        // });
    });

    function animateElements() {
        calculatedElement();
        setStartPosition();
        setPositionFinal();
        calculateTransformPosition();

        setTimeout(function () {
            setInitPosition();
        }, 900);
    }

    function calculatedElement() {
        card.each(function () {
            var _this = $(this);

            if (_this.hasClass('visibility-hidden')) {
                _this.addClass('calculated-elements').nextAll().addClass('calculated-elements');//добавили класс всем элементам, которые будут двигаться
            }
        });

        $('.designers-item-wrapper.calculated-elements').each(function () {
            var _this = $(this);
            if (_this.hasClass('hidden')) {
                _this.removeClass('calculated-elements');
            }
        });
    }

    function setStartPosition() {
        $('.designers-item-wrapper.calculated-elements').each(function () {
            var _this = $(this),
                topInitial = _this.offset().top.toFixed(3),
                leftInitial = _this.offset().left.toFixed(3);
            _this.data('top-initial', topInitial);
            _this.data('left-initial', leftInitial);
        });
    }

    function setPositionFinal() {
        var positionArray = [];

        $('.designers-item-wrapper.calculated-elements').each(function () {

            var _this = $(this),
                nextElPositionTop = _this.data('top-initial'),
                nextElPositionLeft = _this.data('left-initial');

            console.log('nextEl ' + nextElPositionTop + '_' + nextElPositionLeft); //верно высчитывает позиции, которые потом надо расставить элементам

            positionArray.push({
                posTop: nextElPositionTop,
                posLeft: nextElPositionLeft
            });

            if (!_this.hasClass('visibility-hidden')) {
                _this.addClass('pushy-element');
            }
        });

        // console.log(positionArray);

        $('.pushy-element').each(function (index, item) {

            console.log('Top 1: ' + $(item).data('top-initial') + ' Top 2:' + positionArray[index].posTop);
            console.log('Left 1: ' + $(item).data('left-initial') + ' Left 2:' + positionArray[index].posLeft);

            // item.setAttribute('data-top-final', positionArray[index].posTop);
            // item.setAttribute('data-left-final', positionArray[index].posLeft);

            $(item).data('top-final', positionArray[index].posTop);
            $(item).data('left-final', positionArray[index].posLeft);

            console.log(item);

            // item.setAttribute('data-top-initial', 123);
            // item.setAttribute('data-left-initial', 456);

            //$(item).attr('data-top-final', positionArray[index].posTop);
            //$(item).attr('data-left-final', positionArray[index].posLeft);
        });

        // alert('check final calculated-elements final pos');
    }

    function calculateTransformPosition() { //когда знает начальную и конечные точки для элементов - расчет их транслейта -> не менять функцию
        var pushyElement = $('.designers-item-wrapper.pushy-element');

        pushyElement.each(function () {
            var _this = $(this),
                topInitial = _this.data('top-initial'),
                leftInitial = _this.data('left-initial'),
                topFinal = _this.data('top-final'),
                leftFinal = _this.data('left-final');

            var translatePositionX = leftInitial - leftFinal,
                translatePositionY = topInitial - topFinal;

            _this.css({
                "webkitTransform": "translate(" + (-translatePositionX) + "px," + (-translatePositionY) + "px)",
                "MozTransform": "translate(" + (-translatePositionX) + "px," + (-translatePositionY) + "px)",
                "msTransform": "translate(" + (-translatePositionX) + "px," + (-translatePositionY) + "px)",
                "OTransform": "translate(" + (-translatePositionX) + "px," + (-translatePositionY) + "px)",
                "transform": "translate(" + (-translatePositionX) + "px," + (-translatePositionY) + "px)"
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

            _this.removeClass('calculated-elements pushy-element');

            if (_this.hasClass('visibility-hidden')) {
                _this.removeClass('visibility-hidden').addClass('hidden');
            }

            _this.removeAttr('data-top-initial data-left-initial data-top-final data-left-final');

        });
    }
});


