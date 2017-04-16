/**
 * @block Snippet Сниппет поисковой выдачи
 * @dep typo Link ReadMore HorizontalScroll Button thumb
 * @tag snippet
 * @ext adapter typo
 */
Beast.decl({
    Snippet: {
        inherits: ['Typo', 'Adapter'],
        mod: {
            Theme: 'web', // @mod Theme {} ?
            Text: 'M',    // @mod Text {S M* L XL} Размер текста (см. блок #Typo)
            Line: 'M',    // @mod Line {S M* L} Высота строки
        },
        param: {
            href:'' // @param href {string} ссылка на сайт
        },
        expand: function () {
            var url = this.get('url')[0]

            if (url && !url.has() && this.param('href')) {
                var cleanUrl = Typo.cleanUrl(this.param('href'))
                var urlFirstSlashIndex = cleanUrl.indexOf('/')
                url.append(
                    urlFirstSlashIndex > -1
                        ? [
                            <domain>{cleanUrl.substr(0, urlFirstSlashIndex)}</domain>,
                            <path>{cleanUrl.substr(urlFirstSlashIndex)}</path>
                        ]
                        : <domain>{cleanUrl}</domain>
                )
            }

            this.mod({
                    Ad: this.has('ad'),
                    HasSideaction: this.elem('sideaction').length > 0,
                    HasText: this.has('text')
                })
                .append(
                    this.get(
                        'title',
                        'url',
                        'sideaction',
                        'thumb',
                        'call',
                        'text',
                        'sitelinks',
                        'metas',
                        'rating',
                        'actions',
                        'custom'
                    )
                )

            this.get('title')[0].prepend(
                this.get('icon')[0]
            )
        },
        adapter: {
            generic: function (data) {
                console.log(data)

                this.param('href', data.url)
                    .append(
                        Dig(data, 'doctitle', function (data) {
                            return <title>{data}</title>
                        }),
                        <url/>,
                        Dig(data, 'supplementary.generic[0]', function (data) {
                            return (
                                <text>{
                                    data.headline || Dig(data, 'passages[]', function (data) {
                                        return data
                                    })
                                }</text>
                            )
                        })
                    )
            }
        }
    },
    Snippet__title: {
        inherits: ['Link', 'Typo'],
        mod: {
            Theme:'web',
            Text: 'L',
            Line: 'M',
        },
        expand: function () {
            this.param('href', this.parentBlock().param('href'))
                // .append(
                //     this.get('icon'),
                //     this.text()
                // )

            // this.append(
            //     Typo.longWordWrap(this.text())
            // )
        },
        domInit: function fn () {
            this.inherited(fn)
            if (this.parentBlock().mod('ad')) {
                this.domNode().innerHTML = this.text()
            }

            Typo.squareBracketsToTagB(this.domNode())
        }
    },
    Snippet__text: {
        expand: function () {
            this.implementWith(
                <ReadMore>{Typo.wordWrap(this.text())}</ReadMore>
            )
        },
        domInit: function () {
            Typo.squareBracketsToTagB(this.domNode())
        }
    },
    Snippet__ad: {
        inherits: 'Typo',
        mod: {
            Text: 'S'
        },
    },
    Snippet__url: {
        expand: function () {
            this.append(
                this.get('/'),
                this.parentBlock().mod('ad') && <ad>Реклама</ad>
            )
        }
    },
    Snippet__sitelinks: {
        expand: function () {
            this.implementWith(
                <HorizontalScroll>{this.get('/')}</HorizontalScroll>
            )
        }
    },
    Snippet__sitelink: {
        inherits:'Link',
        mod: {
            Theme:'web'
        }
    },
    Snippet__metas: {
        expand: function () {
            this.implementWith(
                <HorizontalScroll>{this.get('/')}</HorizontalScroll>
            )
        }
    },
    Snippet__actions: {
        expand: function () {
            this.append(this.get('/'))
        }
    },
    Snippet__action: {
        mod: {
            Col: 'half',
            Icon: '',
        },
        expand: function () {
            this.implementWith(
                <Button Size="M" Cell/>.append(
                    this.mod('Icon') && <icon/>,
                    this.text()
                )
            )
        }
    },
    Snippet__sideaction: {
        expand: function () {
            this.implementWith(
                <Button Shape="circle" Style="border" Theme="web"><icon/>{this.text()}</Button>
            )
        }
    },
    Snippet__rating: {
        expand: function () {
            this.implementWith(
                <Rating>{this.get('/')}</Rating>
            )
        }
    },
    Snippet__thumb: {
        mod: {
            Col:2,
        },
        expand: function () {
            this.implementWith(
                <Thumb>{this.get()}</Thumb>
            )
        }
    },
    Snippet__icon: {
        implementWith: 'Thumb',
        mod: {
            col: 1,
            rounded: true,
        }
    },
    Snippet__call: {
        implementWith: 'Button',
        param: {
            icon: 'CallLeft',
        },
        mod: {
            Circle: true,
        }
    }
})

/**
 * @example
 * <Snippet href="#">
 *     <title>[Battlefield 1] — купить со скидкой</title>
 *     <url>
 *         <domain>Яндекс.Игры</domain>
 *         <path>/feed</path>
 *     </url>
 *     <text>Год выхода: 20 окт 2016; Платформы: PC, XOne, PS4; Режимы: single, multiplayer; разработчик: DICE.</text>
 * </Snippet>
 */

/**
 * @example
 * <Snippet href="#">
 *     <title>[Battlefield 1] — купить со скидкой</title>
 *     <url>
 *         <domain>Яндекс.Игры</domain>
 *         <path>/feed</path>
 *     </url>
 *     <text>Год выхода: 20 окт 2016; Платформы: PC, XOne, PS4; Режимы: single, multiplayer; разработчик: DICE.</text>
 *     <ad/>
 *     <call/>
 *     <metas>
 *         <meta>Предложение ограничено</meta>
 *     </metas>
 * </Snippet>
 */

/**
 * @example
 * <Snippet href="#">
 *     <title>[Battlefield 1] — купить со скидкой</title>
 *     <url>
 *         <domain>Яндекс.Игры</domain>
 *         <path>/feed</path>
 *     </url>
 *     <text>Год выхода: 20 окт 2016; Платформы: PC, XOne, PS4; Режимы: single, multiplayer; разработчик: DICE.</text>
 *     <sitelinks>
 *         <sitelink>Скриншоты</sitelink>
 *         <sitelink>Обзоры</sitelink>
 *         <sitelink>Системные требования</sitelink>
 *     </sitelinks>
 *     <rating>
 *         <value>5</value>
 *         <text>89 из 100 — Metacritic</text>
 *     </rating>
 *     <custom>
 *         <Gallery>
 *             <thumb>/assets/games/01.jpg</thumb>
 *             <thumb>/assets/games/06.jpg</thumb>
 *             <thumb>/assets/games/02.jpg</thumb>
 *             <thumb>/assets/games/03.jpg</thumb>
 *             <thumb>/assets/games/04.jpg</thumb>
 *             <thumb>/assets/games/05.jpg</thumb>
 *         </Gallery>
 *     </custom>
 * </Snippet>
 */
