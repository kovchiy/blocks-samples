/**
 * @block Thumb Тумбнеил
 * @dep grid link
 * @tag thumb video oo snippet
 * @ext link grid
 */
Beast.decl({
    Thumb: {
        inherits: ['Grid', 'Link'],
        mod: {
            Ratio:'',               // @mod Ratio {1x1 1x2 2x1 2x3 3x2 3x4 4x3 16x10} Пропорция
            Fit:'cover',            // @mod Fit {cover! contain} Растягивание картинки по контейнеру
            Theme:'',               // @mod Theme {app userpic video} Предустановки для разного типа картинок
            Shade: false,           // @mod Shade {boolean} Затенить (для белых границ)
            Grid: false,            // @mod Grid {boolean} Покрыть мелкой сеткой (для картинок плохого качества)
            Parallax: false,        // @mod Parallax {boolean} Параллакс при скролле
            Visibility: 'visible',
            ColorWiz: false,        // @mod ColorWiz {boolean} Отправлять гамму картинки с событием ColorWizMagic
            Shadow: false,          // @mod Shadow {boolean} Тень
            Rounded: false,         // @mod Rounded {boolean} Скругленные углы
        },
        param: {
            src:'',     // @param src {string} Адрес изображения
            width:'',   // @param width {number} Ширина в px
            height:'',  // @param height {number} Высота в px
            title: '',  // @param title {string} Надпись поверх картинки
            ColorWiz: {
                background: '',
                title: '',
                text: '',
                button: '',
            },
        },
        expand: function () {
            var width = this.param('width')
            var height = this.param('height')
            var images = this.elem('image')

            if (this.text()) {
                this.param('src', this.text())
            }

            this.empty()

            if (this.mod('theme') === 'app') {
                this.mod({
                    Ratio:'1x1',
                    Fit:'cover',
                })
            }

            if (this.mod('theme') === 'userpic') {
                this.mod({
                    Ratio:'1x1',
                    Fit:'cover',
                })
            }

            if (this.mod('theme') === 'video') {
                this.mod({
                    Ratio:'16x10',
                    Fit:'cover',
                })
            }

            if (this.mod('Ratio') || (this.param('width') && this.param('height')) || this.mod('Parallax') || this.has('image')) {
                if (this.has('image')) {
                    this.append(
                        <images>{this.get('image')}</images>
                    )
                } else {
                    if (this.mod('Parallax')) {
                        this.append(
                            <image>{this.param('src')}</image>
                        )
                    } else {
                        this.css({
                            backgroundImage: 'url('+ this.param('src') +')',
                            width: this.param('width'),
                            height: this.param('height'),
                        })
                    }
                }

                if (this.param('title')) {
                    this.append(
                        <title>{this.param('title')}</title>
                    )
                }
            } else {
                this.tag('img')
                    .domAttr('src', this.param('src'))

                if (this.param('width')) {
                    this.css('width', width)
                }
                if (this.param('height')) {
                    this.css('height', height)
                }
            }
        },
        domInit: function fn () {
            this.inherited(fn)

            var that = this

            // var width = this.domNode().offsetWidth
            // var height = this.domNode().offsetHeight
            // var img = document.createElement('img')

            // img.setAttribute('src', this.param('src'))
            // img.onload = function () {
            //     if (width && width * window.devicePixelRatio > this.width  ||
            //         height && height * window.devicePixelRatio > this.height ) {
            //         that.mod('Grid', true)
            //     }
            //     img = null
            // }

            if (this.mod('Parallax') || this.mod('Slideshow')) {
                this.checkVisibility()

                if (this.mod('Parallax')) {
                    this.param(
                        'image', this.elem('images')[0] || this.elem('image')[0]
                    )
                }

                var calcOffsetOnScroll = false

                this.onWin('scroll', function () {
                    this.checkVisibility()

                    // Browser gets wrong offset values before window scroll
                    if (!calcOffsetOnScroll) {
                        this.calcOffset(true)
                        calcOffsetOnScroll = true
                    }

                    if (this.mod('Parallax')) {
                        requestAnimationFrame(this.parallaxTranslate.bind(this))
                    }
                }.bind(this))
            }

            if (this.mod('ColorWiz')) {
                requestAnimationFrame(function () {
                    ColorWiz.magic(this.param('src'), function (color) {
                        this.trigger('ColorWizMagic', color)
                    }.bind(this))
                }.bind(this))
            }

            if (this.mod('Theme') === 'app') {
                ColorWiz.isFilled(this.param('src'), function (isFilled) {
                    if (!isFilled) {
                        this.mod('Border', true)
                    }
                }.bind(this))
            }
        },
        calcOffset: function (force) {
            // domNode.offsetParent is null when domNode is not displayed in DOM
            if (this.domNode().offsetParent === null) {
                this.param('display', false)
            }
            else if (!this.param('display') || force) {
                var offset = MissEvent.offset(this.domNode())
                var windowHeight = window.innerHeight
                var offsetHeight = this.domNode().offsetHeight
                var halfOffsetHeight = Math.round(offsetHeight / 2)

                this.param({
                    display: true,
                    offsetleft: offset.left,
                    offsetTop: offset.top,
                    offsetHeight: offsetHeight,
                    halfOffsetHeight: halfOffsetHeight,
                    offsetTopMiddle: offset.top + halfOffsetHeight,
                    offsetBottom: offset.top + offsetHeight,
                    windowHeight: windowHeight,
                    windowHalfHeight: Math.round(windowHeight / 2),
                })
            }
        },
        checkVisibility: function () {
            this.calcOffset()

            if (!this.param('display')) {
                this.mod('Visibility', 'hidden')
                return
            }

            var scrollTop = document.body.scrollTop
            var scrollBottom = scrollTop + this.param('windowHeight')

            if (scrollBottom > this.param('offsetTop') && scrollTop < this.param('offsetBottom')) {
                this.mod('Visibility', 'visible')
            } else {
                this.mod('Visibility', 'hidden')
            }
        },
        parallaxTranslate: function () {
            var middleHeightPoint = window.pageYOffset + this.param('windowHalfHeight')
            var diff = (
                (middleHeightPoint - this.param('offsetTopMiddle')) /
                (this.param('windowHalfHeight') + this.param('halfOffsetHeight')) *
                10
            )

            if (diff > 10) diff = 10
            if (diff < -10) diff = -10

            if (this.param('prevDiff') !== diff) {
                this.param('image').css('transform', 'translateY('+ diff +'px)')
                this.param('prevDiff', diff)
            }
        }
    },

    Thumb__image: {
        mod: {
            State: 'release'
        },
        expand: function () {
            this.empty()
                .css({
                    backgroundImage: 'url('+ this.text() +')',
                    width: this.parentBlock().param('width'),
                    height: this.parentBlock().param('height'),
                })
        }
    },

    Thumb__images: {
        param: {
            timeoutTimer: undefined,
            intervalTimer: undefined,
            timeout: 5000,
        },
        expand: function () {
            this.get('image')[0].mod('State', 'active')
        },
        domInit: function () {
            if (this.parentBlock().mod('Slideshow')) {
                this.parentBlock().onMod('Visibility', 'visible', this.startAnimation.bind(this))
                this.parentBlock().onMod('Visibility', 'hidden', this.stopAnimation.bind(this))
            }
        },
        startAnimation: function () {
            var images = this.get('image')
            var activeIndex
            var activeImage

            this.param(
                'timeoutTimer',
                setTimeout(function () {
                    this.param(
                        'intervalTimer',
                        setInterval(
                            function () {
                                for (var i = 0, ii = images.length; i < ii; i++) {
                                    if (images[i].mod('State') === 'active') {
                                        activeImage = images[i]
                                        activeIndex = i
                                        break
                                    }
                                }

                                if (activeIndex === images.length - 1) {
                                    activeIndex = 0
                                } else {
                                    activeIndex++
                                }

                                activeImage.mod('State', 'release')
                                images[activeIndex].mod('State', 'active')
                            }.bind(this),
                            this.param('timeout')
                        )
                    )
                }.bind(this), 1000 * Math.random())
            )
        },
        stopAnimation: function () {
            if (this.param('timeoutTimer')) {
                clearTimeout(this.param('timeoutTimer'))
            }
            if (this.param('intervalTimer')) {
                clearTimeout(this.param('intervalTimer'))
            }
        },
    },

    Thumb__title: {
        inherits: 'Typo',
        mod: {
            Text: 'S',
            Medium: true,
        }
    },
})

// @example <Thumb Ratio="1x1" Col="3" src="https://jing.yandex-team.ru/files/kovchiy/2017-03-23_02-14-26.png"/>
// @example <Thumb Ratio="1x1" Col="3" Shadow src="https://jing.yandex-team.ru/files/kovchiy/2017-03-23_02-14-26.png"/>
// @example <Thumb Ratio="1x1" Col="3" Grid src="https://jing.yandex-team.ru/files/kovchiy/2017-03-23_02-14-26.png"/>
// @example <Thumb Ratio="1x1" Col="3" Rounded src="https://jing.yandex-team.ru/files/kovchiy/2017-03-23_02-14-26.png"/>