/**
 * @block Table Таблица
 * @dep link typo grid
 * @tag table fact
 */
Beast.decl({
    Table: {
        mod: {
            ScrollX: false,     // @mod ScrollX {boolean} Скролящаяся
            Valign: 'baseline', // @mod Valing {baseline! middle bottom top} Выравнивание по вертикали
        },
        expand: function () {
            this.append(
                <HorizontalScroll Nomargin>
                    <body>{this.get()}</body>
                </HorizontalScroll>
            )
        }
    },

    /**
     * @elem Table__body Тело таблицы
     */
    Table__body: {
        tag: 'table',
        expand: function () {

            // Adding heads wrapper
            if (this.has('head')) {
                this.append(
                    <heads>{this.get('head')}</heads>,
                    this.get('row')
                )
            } else {
                this.append(
                    this.get('heads', 'row')
                )
            }

            // Head colspan
            if (this.elem('head').length === 1) {
                var colspan = 1

                this.elem('row').forEach(function (row) {
                    var cellNum = row.get('cell').length
                    if (cellNum > colspan) colspan = cellNum
                })

                if (colspan > 1) {
                    this.elem('head')[0]
                        .domAttr({colspan:colspan})
                        .mod('Single', true)
                }
            }
        }
    },
    Table__heads: {
        tag: 'tr',
    },

    /**
     * @elem Table__head Шапка таблицы
     * @inherits Table__cell
     */
    Table__head: {
        inherits: 'Table__cell',    // @inherits Table__cell
    },

    /**
     * @elem Table__row Строка таблицы
     */
    Table__row: {
        tag: 'tr',
        expand: function () {
            if (this.param('href')) {
                this.get('cell').forEach(function (cell) {
                    cell.param('href', this.param('href'))
                }.bind(this))
            }
        }
    },

    /**
     * @elem Table__cell Ячейка таблицы
     * @ext Link Typo Grid
     */
    Table__cell: {
        inherits: ['Link', 'Typo', 'Grid'], // @inherits Link Typo Grid
        mod: {
            Text: 'M',      // @mod Text {S M! L XL} Размер текста · #Typo
            Line: 'S',      // @mod Line {S! M L} Размер интерлиньяжа · #Typo
            Strong: false,  // @mod Strong {boolean} Жирный текст
            Right: false,   // @mod Right {boolean} Выравнивание текста по правому краю
            Center: false,  // @mod Center {boolean} Выравнивание текста по центру
            Max:  false,    // @mod Max {boolean} Задаёт колонке 100% ширину
        },
        tag: 'td',
        param: {
            colspan: '',    // @param colspan {number} Количество колонок
            rowspan: '',    // @param rowspan {number} Количество строк
        },
        expand: function () {
            if (this.get('/').length === 0 && this.text().length > 50) {
                this.append(
                    Typo.wordWrap(this.text())
                )
            }

            this.domAttr({
                colspan: this.param('colspan'),
                rowspan: this.param('rowspan'),
            })
        }
    },
})

/**
 * @example
* <Table>
*     <head >Страна</head>
*     <head Right>Золото</head>
*     <head Right>Серебро</head>
*     <head Right>Бронза</head>
*     <row>
*         <cell>Россия</cell>
*         <cell Right>11</cell>
*         <cell Right>5</cell>
*         <cell Right>2</cell>
*     </row>
*     <row>
*         <cell>США</cell>
*         <cell Right>8</cell>
*         <cell Right>3</cell>
*         <cell Right>6</cell>
*     </row>
*     <row>
*         <cell>Китай</cell>
*         <cell Right>5</cell>
*         <cell Right>4</cell>
*         <cell Right>9</cell>
*     </row>
* </Table>
 */

/**
* @example
* <Table Valign="middle">
*     <head/>
*     <head>Название</head>
*     <head Nowrap>По-английски</head>
*     <head>Столица</head>
*     <head Nowrap colspan="2">Буквенные коды</head>
*     <head Nowrap>Код ISO</head>
*     <head Nowrap>Тел. код</head>
*     <row>
*         <cell><Flag Code="AU" Size="M"/></cell>
*         <cell>Австралия</cell>
*         <cell>Australia</cell>
*         <cell>Канберра</cell>
*         <cell>AU</cell>
*         <cell>AUS</cell>
*         <cell>036</cell>
*         <cell>+61</cell>
*     </row>
*     <row>
*         <cell><Flag Code="AT" Size="M"/></cell>
*         <cell>Австрия</cell>
*         <cell>Austria</cell>
*         <cell>Вена</cell>
*         <cell>AT</cell>
*         <cell>AUT</cell>
*         <cell>040</cell>
*         <cell>+43</cell>
*     </row>
*     <row>
*         <cell><Flag Code="AZ" Size="M"/></cell>
*         <cell>Азербайджан</cell>
*         <cell>Azerbaijan</cell>
*         <cell>Баку</cell>
*         <cell>AZ</cell>
*         <cell>AZE</cell>
*         <cell>031</cell>
*         <cell>+994</cell>
*     </row>
*     <row>
*         <cell><Flag Code="AL" Size="M"/></cell>
*         <cell>Албания</cell>
*         <cell>Albania</cell>
*         <cell>Тирана</cell>
*         <cell>AL</cell>
*         <cell>ALB</cell>
*         <cell>008</cell>
*         <cell>+355</cell>
*     </row>
* </Table>
*/