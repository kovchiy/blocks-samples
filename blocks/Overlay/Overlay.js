/**
 * @block Overlay Интерфейс модальных окон
 * @dep UINavigation grid Typo Control
 * @tag base
 * @ext UINavigationItem grid
 */
Beast.decl({
    Overlay: {
        inherits: ['UINavigationItem', 'Grid'],
        mod: {
            Type: 'side', // modal, partsideleft, bottom, top, expand, custom
        },
        onMod: {
            State: {
                active: function (callback) {
                    if (this.mod('Type') === 'expand') {
                        this.moveContextInside()
                    }

                    this.param('activeCallback', callback)
                },
                release: function (callback) {
                    if (this.mod('Type') === 'expand') {
                        this.moveContextOutside()
                    }

                    this.param('releaseCallback', callback)
                },
            }
        },
        param: {
            activeCallback: function () {},
            releaseCallback: function () {},
            title: '',
            subtitle: '',
            theme: {
                backgroundColor: '',
                titleColor: '',
                textColor: '',
                content: false,
            },
            topBar: true,
            background: true,
            margin: true,
        },
        expand: function () {
            if (this.param('theme') === 'movie') {
                this.param('theme', {
                    backgroundColor: '#222',
                    titleColor: '#EEE',
                    textColor: '#999',
                    content: true,
                })
            }

            if (this.param('topBar')) {
                this.append(<topBar/>)
                    .mod('HasTopBar', true)
            }

            if (this.param('background')) {
                this.append(<background/>)
            }

            if (this.mod('Type') === 'partsideleft') {
                this.mod('Col', '1LeftMargins')
            }

            this.append(
                <content>{this.get()}</content>
            )
        },
        on: {
            animationend: function () {
                if (this.mod('Type') === 'expand' && this.param('scrollContent')) {
                    requestAnimationFrame(function () {
                        if (this.elem('content')[0].domNode().scrollTop === 0) {
                            this.param('options').context.css('transform', 'translate3d(0px,0px,0px)')
                            this.elem('content')[0].domNode().scrollTop = -this.param('scrollContent')
                            this.param('scrollContent', false)
                        }
                    }.bind(this))
                }

                if (this.mod('State') === 'release') {
                    this.param('releaseCallback')()
                } else {
                    this.param('activeCallback')()
                }
            }
        },
        moveContextInside: function () {
            var context = this.param('options').context

            // Calculate Global Offset
            var offsetParent = context.domNode()
            var offsetTop = offsetParent.offsetTop
            while (offsetParent = offsetParent.offsetParent) {
                offsetTop += offsetParent.offsetTop
            }

            // Placeholder
            var placeholder = <OverlayPlaceholder/>
            this.param('placeholder', placeholder)
            context.parentNode().insertChild([placeholder], context.index(true))
            placeholder
                .css('height', context.domNode().offsetHeight)
                .domNode().className = context.domNode().className

            context.appendTo(
                this.elem('content')[0]
            )

            offsetTop -= 44
            context.css({
                transform: 'translate3d(0px,' + offsetTop + 'px, 0px)'
            })

            // Context is under of the screen top
            if (offsetTop > 0) {
                requestAnimationFrame(function () {
                    context.css({
                        transition: 'transform 300ms',
                        transform: 'translate3d(0px,0px,0px)',
                    })
                })
            }
            // Context is above of the screen top
            else {
                this.param({
                    scrollContent: offsetTop
                })
            }
        },
        moveContextOutside: function () {
            this.param('placeholder').parentNode().insertChild(
                [this.param('options').context], this.param('placeholder').index(true)
            )
            this.param('placeholder').remove()

            this.param('options').context.css({
                transition: ''
            })
        },
        // pushToStackNavigation: function fn (options) {
        //     if (this.mod('Type') === 'expand') {
        //         options.fog = false
        //     }

        //     this.inherited(fn, options)
        // }
    },
    Overlay__topBar: {
        expand: function () {
            this.css({
                backgroundColor: this.parentBlock().param('theme').backgroundColor,
                color: this.parentBlock().param('theme').titleColor,
                boxShadow: this.parentBlock().param('theme').titleColor && 'none',
            })

            var layerIndex = this.parentBlock().parentNode().index()

            this.append(
                <topBarActionBack/>,
                layerIndex > 1 && <topBarActionClose/>
            )

            var title = this.parentBlock().param('title')
            var subtitle = this.parentBlock().param('subtitle')

            if (title) {
                var titles = <topBarTitles/>.append(
                    <topBarTitle>{title}</topBarTitle>
                )

                if (subtitle) {
                    titles.append(
                        <topBarSubtitle>{subtitle}</topBarSubtitle>
                    )
                }

                this.append(titles)
            }
        }
    },
    Overlay__topBarTitle: {
        inherits: 'Typo',
        mod: {
            Text: 'M',
            Line: 'M',
            Bold: true,
        },
        expand: function () {
            this.css({
                color: this.parentBlock().param('theme').titleColor
            })
        }
    },
    Overlay__topBarSubtitle: {
        inherits: 'Typo',
        mod: {
            Text: 'S',
        },
        expand: function () {
            this.css({
                color: this.parentBlock().param('theme').textColor
            })
        }
    },
    Overlay__topBarAction: {
        inherits: ['Control', 'Typo'],
        mod: {
            Text: 'M',
            Medium: true,
        },
        expand: function () {
            this.css({
                color: this.parentBlock().param('theme').titleColor
            })
        }
    },
    Overlay__topBarActionBack: {
        inherits: 'Overlay__topBarAction',
        expand: function fn () {
            this.inherited(fn)

            this.append(
                <Icon Name="CornerArrowLeft"/>.param({
                    color: this.parentBlock().param('theme').titleColor
                }),
                <topBarActionLabel>Назад</topBarActionLabel>
            )
        },
        on: {
            Release: function () {
                this.parentBlock().popFromStackNavigation()
            }
        }
    },
    Overlay__topBarActionClose: {
        inherits: 'Overlay__topBarAction',
        expand: function fn () {
            this.inherited(fn)

            this.append(
                <Icon Name="Cross"/>.param({
                    color: this.parentBlock().param('theme').titleColor
                })
            )
        },
        on: {
            Release: function () {
                this.parentBlock().popAllFromStackNavigation()
            }
        }
    },
    Overlay__content: {
        inherits: 'Grid',
        expand: function () {
            if (this.parentBlock().param('theme').content) {
                this.css({
                    backgroundColor: this.parentBlock().param('theme').backgroundColor,
                    color: this.parentBlock().param('theme').titleColor,
                    boxShadow: this.parentBlock().param('theme').titleColor && 'none',
                })
            }

            if (this.parentBlock().param('margin')) {
                this.mod({
                    MarginX: true,
                    Wrap: !this.parentBlock().mod('Col'),
                })
            }
        }
    }
})
