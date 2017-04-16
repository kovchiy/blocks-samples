/**
 * @block Suggest Сайджест поисковой выдачи
 * @dep typo Control Button ControlGroup Grid divider
 * @tag serp
 */
Beast.decl({
    Suggest: {
        mod: {
            Empty: false,
        },
        expand: function () {
            this.append(
                <body>
                    <head>
                        <textareaWrap>
                            <textarea/>
                            <clear/>
                        </textareaWrap>
                        <submit/>
                    </head>
                    <phrases>
                        <phrase>смотреть</phrase>
                        <phrase>скачать</phrase>
                        <phrase>купить</phrase>
                    </phrases>
                    <lines>
                        <line>[марсианин] смотреть бесплатно</line>
                        <line>[марсианин] скачать онлайн</line>
                        <line>[марсианин] фильм 2015</line>
                    </lines>
                </body>,
                <space/>
            )
        },
        focus: function () {
            this.elem('textarea')[0].domNode().focus()
        },
        setQuery: function (text) {
            this.elem('textarea')[0].domNode().value = text
            this.checkIfEmpty()
        },
        checkIfEmpty: function () {
            this.mod(
                'Empty', this.elem('textarea')[0].domNode().value === ''
            )
        },
        domInit: function () {
            this.checkIfEmpty()
        }
    },
    Suggest__textarea: {
        inherits: 'Typo',
        tag: 'textarea',
        domAttr: {
            rows: 1,
        },
        mod: {
            Text: 'M',
            Line: 'S',
        },
        on: {
            input: function () {
                this.parentBlock().checkIfEmpty()
            }
        }
    },
    Suggest__submit: {
        inherits: ['Typo', 'Control'],
        mod: {
            Caps: true,
        },
        expand: function () {
            this.append(
                <submitLabel>Найти</submitLabel>
            )
        },
        on: {
            Release: function () {
                this.parentBlock().trigger('Submit', this.elem('textarea')[0].domNode().value)
            }
        }
    },
    Suggest__phrases: {
        expand: function () {
            this.implementWith(<ControlGroup Type="justify">{this.get('/')}</ControlGroup>)
        }
    },
    Suggest__phrase: {
        expand: function () {
            this.implementWith(<Button>{this.text()}</Button>)
        }
    },
    Suggest__lines: {
        expand: function () {
            var dividedLines = []
            var lines = this.get('line')

            this.append(<Divider Size="M"/>)
            for (var i = 0, ii = lines.length; i < ii; i++) {
                this.append(
                    lines[i],
                    (i !== ii - 1) && <Divider Size="M"/>
                )
            }
        }
    },
    Suggest__line: {
        inherits: ['Control', 'Grid', 'Typo'],
        mod: {
            MarginX: true,
            Text: 'M',
        },
        domInit: function () {
            Typo.squareBracketsToTagB(this.domNode())
        }
    },
    Suggest__space: {
        inherits: 'Control',
        on: {
            Release: function () {
                this.parentBlock().trigger('SpaceActivated')
            }
        }
    },
    Suggest__clear: {
        inherits: 'Control',
        on: {
            Release: function () {
                this.parentBlock().setQuery('')
            }
        }
    }
})
