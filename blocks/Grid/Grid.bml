/**
 * @block Grid Динамическая сетка
 * @tag base
 */
Beast.decl({
    Grid: {
        // finalMod: true,
        mod: {
            Col: '',                // @mod Col {number} Ширина в колонках
            Wrap: false,            // @mod Wrap {boolean} Основной контейнер сетки
            Margin: false,          // @mod Margin {boolean} Поля
            MarginX: false,         // @mod MarginX {boolean} Горизонтальные поля
            MarginY: false,         // @mod MarginY {boolean} Вертикальные поля
            Unmargin: false,        // @mod Unmargin {boolean} Отрицательные поля
            UnmarginX: false,       // @mod UnmarginX {boolean} Отрицательные горизоантальные поля
            UnmarginY: false,       // @mod UnmarginY {boolean} Отрацательные вертикальные поля
            MarginRightGap: false,  // @mod MarginRightGap {boolean} Правый отступ равен — горизоантальное поле
            MarginLeftGap: false,   // @mod MarginLeftGap {boolean} Левый отступ равен — горизоантальное поле
            Cell: false,            // @mod Cell {boolean} Горизонтальный отступ между соседями — межколонник
            Row: false,             // @mod Row {boolean} Вертикальынй отступ между соседями — межколонник
            Rows: false,            // @mod Rows {boolean} Дочерние компоненты отступают на горизонтальное поле
            Tile: false,            // @mod Tile {boolean} Модификатор дочернего компонента (для модификатора Tiles)
            Tiles: false,           // @mod Tiles {boolean} Дочерние компоненты плиткой с отступами в поле
            Center: false,          // @mod Center {boolean} Выравнивание по центру
            Hidden: false,          // @mod Hidden {boolean} Спрятать компонент
            ColCheck: false,        // @mod ColCheck {boolean} Считать ширину в колонках
            Ratio: '',              // @mod Ratio {1x1 1x2 3x4 ...} Пропорция
        },
        param: {
            isMaxCol: false,
        },
        onMod: {
            Col: {
                '*': function (fromParentGrid) {
                    if (fromParentGrid === undefined) {
                        this.param('isMaxCol', this.mod('col') === 'max')
                    }
                }
            }
        },
        onCol: undefined,
        domInit: function () {
            this.param('isMaxCol', this.mod('col') === 'max')

            if (this.mod('ColCheck')) {
                this.onWin('resize', this.checkColWidth)
                requestAnimationFrame(function () {
                    this.checkColWidth()
                }.bind(this))
            }
        },
        onAttach: function (firstTime) {
            this.setParentGrid(!firstTime)
        },
        checkColWidth: function () {
            var prop = this.css('content').slice(1,-1).split(' ')
            var col = parseInt(prop[0])
            var gap = parseInt(prop[1])
            var maxCol = parseInt(prop[2])
            var marginX = parseInt(prop[3])
            var marginY = parseFloat(prop[4])

            if (isNaN(col)) {
                return
            }

            var width = this.domNode().offsetWidth
            var colNum = Math.floor((width + gap) / (col + gap))

            if (colNum > maxCol) {
                colNum = maxCol
            }

            this.trigger('Col', {
                num: colNum,
                edge: window.innerWidth === (colNum * col + (colNum-1) * gap + marginX * 2),
                col: col,
                gap: gap,
                marginX: marginX,
                marginY: marginY,
            })
        },
        setParentGrid: function (recursive, parentGrid) {
            if (this.onCol !== undefined || this.onEdge !== undefined || this.param('isMaxCol')) {
                var that = this

                if (parentGrid === undefined) {
                    parentGrid = this._parentNode
                    while (parentGrid !== undefined && !(parentGrid.isKindOf('Grid') && parentGrid.mod('ColCheck'))) {
                        parentGrid = parentGrid._parentNode
                    }
                }

                if (parentGrid !== undefined) {
                    if (this.onCol || this.param('isMaxCol')) {
                        parentGrid.on('Col', function (e, data) {
                            that.onCol && that.onCol(data.num, data.edge, data)
                            that.param('isMaxCol') && that.mod('Col', data.num, true)
                        })
                    }
                }
            }

            if (recursive !== undefined) {
                var children = this.get('/')
                for (var i = 0, ii = children.length; i < ii; i++) {
                    if (children[i].isKindOf('grid') && !children[i].mod('ColCheck')) {
                        children[i].setParentGrid(recursive, parentGrid)
                    }
                }
            }
        }
    }
})

function grid (num, col, gap, margin) {
    var gridWidth = col * num + gap * (num - 1) + margin * 2
    return gridWidth
}