/**
 * @block Button Кнопка
 * Основная в группе контролов
 * @dep ControlForm Icon
 * @tag control
 * @ext ControlForm
 */
Beast.decl({
    Button: {
        inherits: 'ControlForm',
        tag: 'button',
        // finalMod: true,
        mod: {
            Action: false,  // @mod Action {boolean} Активная
            Circle: false,  // @mod Circle {boolean} Круглая
            NoLabel: false, // @mod NoLabel {boolean} Без лейбла (убиeрает отступы)
            Size: 'M',      // @mod Size {S M!} Размер
        },
        param: {
            href:'', // @param href {string} адрес ссылки
            icon:'', // @param icon {string} имя иконки (см. блок #Icon)
        },
        expand: function fn () {
            this.inherited(fn)

            if (this.mod('Action')) {
                this.domAttr('type', 'submit')
            }

            if (this.param('icon')) {
                this.append(<Icon Name="{this.param('icon')}"/>)
                    .mod('Medium', true)
            }

            var children = this.get('/')
            var text = this.text()

            if (children[0] !== undefined) {
                this.append(<label>{children}</label>)
            } else if (text !== '') {
                this.append(<label>{Typo.trimSpaces(text)}</label>)
            } else {
                this.mod('NoLabel', true)
            }
        },
        on: {
            // @event Release Произошло нажатие
            Release: function () {
                if (this.param('href') || this.param('service')) {
                    Native.call('didPressLink', {
                        url: this.param('href'),
                        service: this.param('service'),
                        data: this.param('data'),
                        title: this.param('serviceTitle') || '',
                        requiresNewTab: true,
                    })
                }
            }
        },
        onMod: {
            Loading: {
                '*': function () {
                    this.mod('Disabled', this.mod('Loading'))
                }
            }
        },
        /**
         * @method value Установить значение лейбла
         * @arg value {string}
         */
        value: function fn (value) {
            this.inherited(fn, value)
                .elem('label')[0].empty().append(value)
        },
        /**
         * @method setTheme Установить тему
         * @arg backgroundColor {string} hex-код цвета фона
         * @arg textColor {string} hex-код цвета текста
         */
        setTheme: function (backgroundColor, textColor) {
            this.css('background-color', backgroundColor)
            this.elem('label').forEach(function (elem) {
                elem.css('color', textColor)
            })
            this.elem('icon').forEach(function (elem) {
                elem.css('background-color', textColor)
            })
        }
    },
    Button__label: {
        noElems: true,
    }
})

// @example Просто кнопка <Button Size="M">Кнопка</Button>

// @example Кнопка с иконкой <Button Size="M" icon="Handset">Позвонить</Button>