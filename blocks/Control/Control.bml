/**
 * @block Control Контрол
 * Абстракция для всех активных элементов
 * @dep Counter
 * @tag base
 * @ext counter
 */
Beast.decl({
    Control: {
        inherits: 'Counter',
        abstract: true,
        mod: {
            Moment: 'release',      // @mod Moment {release! active} Момент срабатывания
            Focus: false,           // @mod Focus {boolean} Состояние фокуса
            Mouseover: false,       // @mod MouseOver {boolean} Состояние hover
            StopPropagation: false, // @mod StopPropagation {boolean} Останавливать ли распространение клика на родителей
            Disabled: false,        // @mod Disabled {boolean} Неактивное состояние
        },
        onWin: {
            keydown: function (e) {
                if (!MissEvent.mobile && e.keyCode === this._key.tab) {
                    this.mod('keyboard', true)
                }
            }
        },
        on: {
            'mousedown touchstart': function (e) {
                if (MissEvent.mobile && e.type === 'mousedown') return

                if (this.mod('Disabled')) return e.preventDefault()

                // Press
                this.mod('moment', 'press', true)

                // Dont use keyboard
                this.mod('keyboard', false)

                if (this.mod('StopPropagation')) {
                    e.stopPropagation()
                }
            },
            'mouseup touchend': function (e) {
                if (MissEvent.mobile && e.type === 'mouseup') return

                // Release
                if (this.mod('moment') === 'press') {
                    this.mod('moment', 'release', true)
                }
            },
            'mouseout touchmove': function () {
                // Press cancelled
                if (this.mod('moment') === 'press') {
                    this.mod('moment', 'release', false)
                }
                // Hover cancelled
                if (!MissEvent.mobile) {
                    this.mod('mouseover', false)
                }
            },
            mouseover: function () {
                if (!this.mod('Disabled')) {
                    this.mod('mouseover', true)
                }
            },
            keydown: function (e) {
                if (e.keyCode === this._key.enter || e.keyCode === this._key.space) {
                    this.mod('moment', 'press', true)
                }
            },
            keyup: function (e) {
                if (e.keyCode === this._key.enter || e.keyCode === this._key.space) {
                    if (this.mod('moment') == 'press') {
                        this.mod('moment', 'release', true)
                    }
                }
            },
            focus: function () {
                this.mod('focus', true)
            },
            blur: function () {
                this.mod('focus', false)
            },

            Press: '',      // @event Press Момент начала нажатия
            Release: '',    // @event Release Момент окончания нажатия
            Focus: '',      // @event Focus Произошел фокус
            Blur: '',       // @event Blur Фокус пропал
            MouseOver: '',  // @event MouseOver Мышка вошла в границы компонента
            MouseOut: '',   // @event MouseOut Мышка покинула границы компонента
        },
        onMod: {
            Moment: {
                press: function (triggerEvent) {
                    if (triggerEvent) {
                        this.trigger('Press')
                    }
                },
                release: function (triggerEvent) {
                    if (triggerEvent) {
                        this.trigger('Release')
                        this.focus()
                    }
                }
            },
            Focus: {
                true: function () {
                    this.trigger('Focus')
                },
                false: function () {
                    this.trigger('Blur')
                }
            },
            Mouseover: {
                true: function () {
                    this.trigger('MouseOver')
                },
                false: function () {
                    this.trigger('MouseOut')
                }
            }
        },

        // @method focus Установить фокус
        focus: function () {},

        _key:
        {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            backspace: 8,
            space: 32,
            tab: 9,
            enter: 13,
            esc: 27,
        },
    },
})
