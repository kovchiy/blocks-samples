Beast.decl({

    /**
     * @block UINavigationItem Компонент паттерна навигации
     * @tag base
     */
    UINavigationItem: {
        mod: {
            State: '', // active, release
        },
        onMod: {
            State: {
                active: function (callback) {
                    callback && callback()
                },
                release: function (callback) {
                    callback && callback()
                }
            }
        },
        activate: function(callback) {
            this.mod('state', 'active', callback)
        },
        release: function(callback) {
            this.mod('state', 'release', callback)
        },

        /**
         * Pushes itself to StackNavigation
         * @options {context:BemNode, onDidPush:function, onDidPop:function, onWillPush:function, onWillPop:function, fog:boolean}
         */
        pushToStackNavigation: function(options) {
            if (options.fog === undefined) {
                options.fog = true
            }

            this.param('options', options)
            this._parentContextOfKind('UIStackNavigation', options.context).push(this)
            return this
        },

        /**
         * Pops itself from StackNavigation
         */
        popFromStackNavigation: function() {
            this._parentContextOfKind('UIStackNavigation', this).pop()
            return this
        },

        /**
         * Pops all NavigationItems from StackNavigation
         */
        popAllFromStackNavigation: function() {
            this._parentContextOfKind('UIStackNavigation', this).popAll()
            return this
        },

        /**
         * Gets parent node for @context of @kind
         */
        _parentContextOfKind: function(kind, context) {
            var node = context._parentNode
            while (!node.isKindOf(kind)) node = node._parentNode
            return node
        },
    },

    /**
     * @block UIStackNavigation Паттерн стэковой навигации
     * @tag base
     */
    UIStackNavigation: {
        inherits: 'UINavigationItem',
        param: {
            storedScrollPosition: 0,
        },
        expand: function() {
            this.append(<layer>{this.get('/')}</layer>)
            this.topLayer().mod('Root', true)
        },
        onMod: {
            Pushing: {
                true: function () {
                    this.mod('HasFog', this.topNavigationItem().param('options').fog)
                }
            },
            Popping: {
                false: function () {
                    var topItemOptions = this.topNavigationItem().param('options')
                    if (topItemOptions) {
                        this.mod('HasFog', topItemOptions.fog)
                    }
                }
            }
        },
        onWin: {
            popstate: function (e) {
                var item = this.topNavigationItem()
                item && item.popFromStackNavigation && item.popFromStackNavigation()
            }
        },

        /**
         * Pushes @navigationItem to stack
         */
        push: function(navigationItem) {
            this.storeRootScrollPosition()

            this.append(<layer>{navigationItem}</layer>)

            this.mod('Pushed', !this.topLayer().mod('Root'))
                .mod('Pushing', true)

            var onDidPush = this.topNavigationItem().param('options').onDidPush
            var onWillPush = this.topNavigationItem().param('options').onWillPush

            this.topNavigationItem().activate(function() {
                this.mod('Pushing', false)
                onDidPush && onDidPush()
            }.bind(this))

            history.pushState({UIStackNavigation: true}, '', '#')

            onWillPush && onWillPush()
        },

        /**
         * Pops @navigationItem from stack
         */
        pop: function(index) {
            this.mod('Popping', true)

            var navigationItem = index === undefined
                ? this.topNavigationItem()
                : this.navigationItemByIndex(index)

            var onWillPop = navigationItem.param('options').onWillPop
            var onDidPop = navigationItem.param('options').onDidPop

            var onRelease = function() {
                onDidPop && onDidPop()
                this.topLayer().remove()
                this.mod('Pushed', !this.topLayer().mod('Root'))
                this.restoreRootScrollPosition()
                this.mod('Popping', false)
            }.bind(this)

            navigationItem.release(onRelease)

            onWillPop && onWillPop()
        },

        /**
         * Pops all @navigationItem's from stack
         */
        popAll: function () {
            this.elem('layer').forEach(function(layer, index) {
                if (index !== 0) {
                    layer.parentBlock().pop(index)
                }
            })
        },

        /**
         * Gets top layer from stack
         */
        topLayer: function() {
            return this.elem('layer').pop()
        },

        /**
         * Gets NavigationItem of top layer
         */
        topNavigationItem: function() {
            return this.topLayer().get('/')[0]
        },

        /**
         * Gets NavigationItem by layer index
         */
        navigationItemByIndex: function (index) {
            return this.elem('layer')[index].get('/')[0]
        },

        /**
         * Stores scroll position
         */
        storeRootScrollPosition: function() {
            if (this.topLayer().mod('Root')) {
                this.param('scrollPosition', window.pageYOffset || document.documentElement.scrollTop)
                this.topLayer().css('margin-top', -this.param('scrollPosition'))
            }
        },

        /**
         * Resores scroll position
         */
        restoreRootScrollPosition: function() {
            if (this.topLayer().mod('Root')) {
                this.topLayer().css('margin-top', '')
                window.scrollTo(0, this.param('scrollPosition'))
            }
        },
    },

    UIStackNavigation__layer: {
        expand: function () {
            this.append(this.get('/'), <fog/>)
        }
    },

    UIStackNavigation__fog: {
        inherits: 'Control',
        on: {
            Release: function () {
                this.parentBlock().popAll()
            }
        }
    },

    /**
     * @block UISwitchNavigation Паттерн табовой навигации
     * @tag base
     */
    UISwitchNavigation: {
        inherits: 'UINavigationItem',
        expand: function() {
            this.append(
                this.get('/').map(function(item, index) {
                    return <layer>{item}</layer>
                })
            )
        },

        /**
         * Switches to item element with @index
         */
        switchToIndex: function (index) {
            if (this.elem('layer').length !== 0) {
                this.elem('layer').forEach(function(layer, layerIndex) {
                    var navigationItem = layer.get('/')[0]
                    if (layerIndex === index) {
                        layer.activate()
                    } else {
                        layer.release()
                    }
                })
            } else {
                this.param('switchToIndex', index)
            }
        }
    },
    UISwitchNavigation__layer: {
        inherits: 'UINavigationItem',
        noElems: true,
        mod: {
            State: 'release'
        },
        expand: function () {
            if (this.parentBlock().param('switchToIndex') === this.index()) {
                this.activate()
            }

            this.append(this.get('/'))
        }
    }
})
